import { Dataset } from '../types';
import { OGCClient } from '../utils/ogcClient';
export declare function resolveFeatureType(dataset: Dataset, ogcClient: OGCClient): Promise<Dataset>;
