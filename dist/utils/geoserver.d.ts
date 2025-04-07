import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { Metadata } from '../utils/types';

type Params = Record<string, string | string[] | number | number[] | boolean>;
export declare function makeUrl(url: string, params: Params): string;
export declare function makeWMSUrl(options: Params): string;
export declare function sendWFSRequest<T>(
  options: Params,
  config?: Partial<AxiosRequestConfig>,
): Promise<AxiosResponse<T>>;
export declare function getInitialSettings(): Promise<Metadata>;
export declare function downloadDataset(name: string): Promise<void>;
export declare function getLegendImageObjectUrl(
  layerId: string,
): Promise<string>;
export declare function getLegendJSON<T>(layerId: string): Promise<T>;
export {};
