import { MapLayer } from '../../../store/explore/types';
import { ClimateDatasetInfo } from '../../../utils/types';
type Props = {
    layer: MapLayer & {
        data: {
            dataset_info: ClimateDatasetInfo;
        };
    };
};
export declare function ClimateLayerSummary({ layer }: Props): import("react/jsx-runtime").JSX.Element;
export {};
