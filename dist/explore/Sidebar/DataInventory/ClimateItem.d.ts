import { ClimateDatasetInfo, Dataset } from '../../../utils/types';
type Props = {
    dataset: Dataset;
    climateSelectedOption: keyof ClimateDatasetInfo;
};
export declare function ClimateItem({ dataset, climateSelectedOption }: Props): import("react/jsx-runtime").JSX.Element;
export {};
