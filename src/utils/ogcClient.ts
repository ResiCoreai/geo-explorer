import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import maplibregl from 'maplibre-gl';

import { TILE_SIZE } from '@ncsa/geo-explorer/config';
import {
  SimpleFeature,
  SimpleFeatureCollection,
} from '@ncsa/geo-explorer/store/explore/slice';
import { Dataset, FeatureTypeInfo } from '@ncsa/geo-explorer/types';

export type Params = Record<
  string,
  string | number | boolean | Array<string | number>
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

  public async describeFeatureType(dataset: Dataset): Promise<FeatureTypeInfo> {
    const { data } = await this.sendWFSRequest<FeatureTypeInfo>(
      dataset.ogc_service_url,
      {
        typeName: dataset.layer_id,
        request: 'DescribeFeatureType',
      },
    );
    return data;
  }

  public async identifyFeature(
    e: maplibregl.MapMouseEvent,
    dataset: Dataset,
  ): Promise<SimpleFeature[]> {
    const map = e.target;
    const mousePosition = map.project(e.lngLat);
    const margin = 5;
    const sw = map.unproject([
      mousePosition.x - margin,
      mousePosition.y + margin,
    ]);
    const ne = map.unproject([
      mousePosition.x + margin,
      mousePosition.y - margin,
    ]);
    const { data } = await this.sendWFSRequest<SimpleFeatureCollection>(
      dataset.ogc_service_url,
      {
        typeName: dataset.layer_id,
        bbox: [sw.lat, sw.lng, ne.lat, ne.lng],
        count: 10,
      },
    );
    return data.features;
  }
}
