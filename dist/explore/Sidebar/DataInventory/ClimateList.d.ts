import { ClimateDatasetInfo, Dataset } from '../../../utils/types';
type Props = {
    climateDatasets: Dataset[];
    climateSelectedOption: keyof ClimateDatasetInfo;
};
export declare function ClimateList({ climateDatasets, climateSelectedOption }: Props): import("react/jsx-runtime").JSX.Element;
export {};
