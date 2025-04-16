import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { LngLat } from 'maplibre-gl';

import { TILE_SIZE } from '@ncsa/geo-explorer/config';
import {
  SimpleFeature,
  SimpleFeatureCollection,
} from '@ncsa/geo-explorer/store/explore/slice';
import { Dataset } from '@ncsa/geo-explorer/types';
import { getMetersPerPixelAtLatitude } from '@ncsa/geo-explorer/utils/maplibre-utils';

export type Params = Record<
  string,
  string | string[] | number | number[] | boolean
>;

export class OGCClient {
  private request: AxiosInstance;

  constructor(options: { accessToken?: string | undefined }) {
    this.request = axios.create();
    if (options.accessToken) {
      this.request.interceptors.request.use((config) => {
        config.headers['Authorization'] = `Bearer ${options.accessToken}`;
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

  public makeWMSUrl(serviceUrl: string, options: Params) {
    return (
      this.makeUrl(`${serviceUrl}/wms`, {
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

  public async getLegendImageObjectUrl(dataset: Dataset): Promise<string> {
    return this.getImageBlobUrl({
      url: `${dataset.ogc_service_url}/wms`,
      params: {
        request: 'GetLegendGraphic',
        version: '1.0.0',
        format: 'image/png',
        layer: dataset.layer_id,
      },
    });
  }

  public async getLegendJSON<T>(dataset: Dataset): Promise<T> {
    const { data } = await this.request<T>({
      url: `${dataset.ogc_service_url}/wms`,
      params: {
        version: '1.3.0',
        request: 'GetLegendGraphic',
        format: 'application/json',
        layer: dataset.layer_id,
      },
    });
    return data;
  }

  public sendWFSRequest<T>(
    serviceUrl: string,
    options: Params,
    config?: Partial<AxiosRequestConfig>,
  ): Promise<AxiosResponse<T>> {
    return this.request({
      url: this.makeUrl(`${serviceUrl}/wfs`, {
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

  public async downloadDataset(dataset: Dataset) {
    try {
      const { data } = await this.sendWFSRequest<Blob>(
        dataset.ogc_service_url,
        {
          typeNames: dataset.layer_id,
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
    dataset: Dataset,
    lngLat: LngLat,
    zoom: number,
  ): Promise<SimpleFeature[]> {
    const { lng, lat } = lngLat;

    const metersPerPixel = getMetersPerPixelAtLatitude(lat, zoom);
    const radiusInPixels = 10; // detect hits within 10 pixels of the cursor
    const radiusInMeters = radiusInPixels * metersPerPixel;

    const { data } = await this.sendWFSRequest<SimpleFeatureCollection>(
      dataset.ogc_service_url,
      {
        typeName: dataset.layer_id,
        cql_filter: `DWITHIN(geom, SRID=4326;POINT(${lng} ${lat}), ${radiusInMeters}, meters)`,
      },
    );

    return data.features;
  }
}
