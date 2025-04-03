import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { GEOSERVER_URL, TILE_SIZE } from '@ncsa/geo-explorer/config';
import { getImageBlobUrl } from '@ncsa/geo-explorer/utils/image';
import { request } from '@ncsa/geo-explorer/utils/request';
import { Metadata } from '@ncsa/geo-explorer/utils/types';

type Params = Record<string, string | string[] | number | number[] | boolean>;

export function makeUrl(url: string, params: Params) {
  return (
    url +
    '?' +
    new URLSearchParams(
      Object.entries(params).map(([key, value]) => [key, String(value)]),
    ).toString()
  );
}

export function makeWMSUrl(options: Params) {
  return (
    makeUrl(`${GEOSERVER_URL}/wms`, {
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

export function sendWFSRequest<T>(
  options: Params,
  config?: Partial<AxiosRequestConfig>,
): Promise<AxiosResponse<T>> {
  return request({
    url: makeUrl(`${GEOSERVER_URL}/wfs`, {
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

export async function getInitialSettings(): Promise<Metadata> {
  const { data } = await request.get<Metadata>('/layers.json');

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

export async function downloadDataset(name: string) {
  try {
    const { data } = await sendWFSRequest<Blob>(
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

export async function getLegendImageObjectUrl(
  layerId: string,
): Promise<string> {
  return getImageBlobUrl({
    url: `${GEOSERVER_URL}/wms`,
    params: {
      request: 'GetLegendGraphic',
      version: '1.0.0',
      format: 'image/png',
      layer: layerId,
    },
  });
}

export async function getLegendJSON<T>(layerId: string): Promise<T> {
  const { data } = await request<T>({
    url: `${GEOSERVER_URL}/wms`,
    params: {
      version: '1.3.0',
      request: 'GetLegendGraphic',
      format: 'application/json',
      layer: layerId,
    },
  });
  return data;
}
