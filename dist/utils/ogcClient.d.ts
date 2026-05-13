import { AxiosRequestConfig, AxiosResponse } from 'axios';
import maplibregl from 'maplibre-gl';
import { SimpleFeature } from '../store/explore/slice';
import { Dataset, FeatureTypeInfo, Legend, Symbolizer } from '../types';
export type Params = Record<string, string | number | boolean | Array<string | number>>;
export declare class OGCClient {
    private request;
    constructor(options: {
        accessToken?: string | undefined;
    });
    private makeUrl;
    makeWMSUrl(serviceUrl: string, options: Params): string;
    getImageBlobUrl(config: AxiosRequestConfig): Promise<string>;
    getLegendImageObjectUrl(dataset: Dataset): Promise<string>;
    getStyleNames(dataset: Dataset): Promise<string[]>;
    getLegendJSON<T extends Symbolizer>(dataset: Dataset): Promise<Legend<T>>;
    sendWFSRequest<T>(serviceUrl: string, options: Params, config?: Partial<AxiosRequestConfig>): Promise<AxiosResponse<T>>;
    downloadDataset(dataset: Dataset): Promise<void>;
    describeFeatureType(dataset: Dataset): Promise<FeatureTypeInfo>;
    identifyFeature(e: maplibregl.MapMouseEvent, dataset: Dataset): Promise<SimpleFeature[]>;
}
