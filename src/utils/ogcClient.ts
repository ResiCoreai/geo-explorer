import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { LngLat } from 'maplibre-gl';

import { TILE_SIZE } from '@ncsa/geo-explorer/config';
import {
  SimpleFeature,
  SimpleFeatureCollection,
} from '@ncsa/geo-explorer/store/explore/slice';
import { getMetersPerPixelAtLatitude } from '@ncsa/geo-explorer/utils/maplibre-utils';
import { Metadata } from '@ncsa/geo-explorer/utils/types';

type Params = Record<string, string | string[] | number | number[] | boolean>;

export class OGCClient {
  private request: AxiosInstance;

  constructor(
    public serviceUrl: string,
    bearerToken?: string,
  ) {
    this.request = axios.create();
    if (bearerToken) {
      this.request.interceptors.request.use((config) => {
        config.headers['Authorization'] = `Bearer ${bearerToken}`;
        return config;
      }, null);
    }
  }

  private makeUrl(url: string, params: Params) {
    return (
      url +
      '?' +
      new URLSearchParams(
        Object.entries(params).map(([key, value]) => [key, String(value)]),
      ).toString()
    );
  }

  public makeWMSUrl(options: Params) {
    return (
      this.makeUrl(`${this.serviceUrl}/wms`, {
        format: 'image/png',
        service: 'WMS',
        version: '1.3.0',
        request: 'GetMap',
        srs: 'EPSG:3857',
        width: TILE_SIZE,
        height: TILE_SIZE,
        transparent: true,
        ...options,
      }) + '&bbox={bbox-epsg-3857}'
    );
  }

  public async getImageBlobUrl(config: AxiosRequestConfig): Promise<string> {
    const { data: blob } = await this.request<Blob>({
      ...config,
      responseType: 'blob',
    });
    return URL.createObjectURL(blob);
  }

  public async getLegendImageObjectUrl(layerId: string): Promise<string> {
    return this.getImageBlobUrl({
      url: `${this.serviceUrl}/wms`,
      params: {
        request: 'GetLegendGraphic',
        version: '1.0.0',
        format: 'image/png',
        layer: layerId,
      },
    });
  }

  public async getLegendJSON<T>(layerId: string): Promise<T> {
    const { data } = await this.request<T>({
      url: `${this.serviceUrl}/wms`,
      params: {
        version: '1.3.0',
        request: 'GetLegendGraphic',
        format: 'application/json',
        layer: layerId,
      },
    });
    return data;
  }

  public sendWFSRequest<T>(
    options: Params,
    config?: Partial<AxiosRequestConfig>,
  ): Promise<AxiosResponse<T>> {
    return this.request({
      url: this.makeUrl(`${this.serviceUrl}/wfs`, {
        service: 'WFS',
        version: '2.0.0',
        request: 'GetFeature',
        srsName: 'EPSG:4326',
        outputFormat: 'application/json',
        ...options,
      }),
      ...config,
    });
  }

  public async downloadDataset(name: string) {
    try {
      const { data } = await this.sendWFSRequest<Blob>(
        {
          typeNames: name,
          outputFormat: 'csv',
        },
        {
          responseType: 'blob',
        },
      );
      const a = document.createElement('a');
      a.href = URL.createObjectURL(data);
      a.download = name + '.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      // TODO: show error message
    }
  }

  public async identifyFeature(
    layer_id: string,
    lngLat: LngLat,
    zoom: number,
  ): Promise<SimpleFeature[]> {
    const { lng, lat } = lngLat;

    const metersPerPixel = getMetersPerPixelAtLatitude(lat, zoom);
    const radiusInPixels = 10; // detect hits within 10 pixels of the cursor
    const radiusInMeters = radiusInPixels * metersPerPixel;

    const { data } = await this.sendWFSRequest<SimpleFeatureCollection>({
      typeName: layer_id,
      cql_filter: `DWITHIN(geom, SRID=4326;POINT(${lng} ${lat}), ${radiusInMeters}, meters)`,
    });

    return data.features;
  }

  public async getInitialSettings(): Promise<Metadata> {
    const { data } = await this.request.get<Metadata>('/layers.json');

    // Process climate layers to ensure timestamps are sorted and in ISO 8601 format
    const processedLayers = data.climate_layers.map((layer) => ({
      ...layer,
      dataset_info: {
        ...layer.dataset_info,
        timestamps: layer.dataset_info.timestamps
          .map((timestamp) => new Date(timestamp))
          .sort((a, b) => a.getTime() - b.getTime()) // Sort ascending
          .map((date) => date.toISOString()),
      },
    }));

    // Return modified metadata with processed layers
    return {
      ...data,
      climate_layers: processedLayers,
    };
  }
}
