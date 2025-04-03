import { MapLayer } from '../../../store/explore/types';
import { VectorDatasetInfo } from '../../../utils/types';
type Props = {
    layer: MapLayer & {
        data: {
            dataset_info: VectorDatasetInfo;
        };
    };
};
export declare function SingleLegendIcon({ layer }: Props): import("react/jsx-runtime").JSX.Element | null;
export {};
