import { ReactNode } from 'react';
import { MapLayer } from '../../../store/explore/types';
export declare const layerTypeIcons: Array<{
    type: 'point' | 'line' | 'polygon' | 'raster';
    icon: (props: {
        className?: string;
    }) => ReactNode;
}>;
export declare const categoryIcons: Array<{
    type: 'power' | 'administrative' | 'storage' | 'water';
    icon: (props: {
        className?: string;
    }) => ReactNode;
}>;
export declare const climateVariableIcons: Array<{
    type: 'hurs' | 'huss' | 'pr' | 'rlds' | 'rsds' | 'sfcWind' | 'tas' | 'tasmax' | 'tasmin';
    icon: (props: {
        className?: string;
    }) => ReactNode;
}>;
type VariableDescription = {
    description: string;
    units: string;
    default_style_name: string;
};
export declare const typeDescription: Record<string, VariableDescription>;
export declare const climateScenarioIcons: Array<{
    type: 'All-Model Ensemble Projection' | 'Extreme Cold Scenario Projection' | 'Extreme Heat Scenario Projection' | 'High Humidity Scenario Projection' | 'Severe Drought Scenario Projection';
    icon: (props: {
        className?: string;
    }) => ReactNode;
}>;
export declare function getLayerIconByType(layer: MapLayer): ((props: {
    className?: string;
}) => ReactNode) | undefined;
export declare function getLayerIconByCategory(layer: MapLayer): ((props: {
    className?: string;
}) => ReactNode) | undefined;
export declare function getClimateVariableIcon(layer: MapLayer): ((props: {
    className?: string;
}) => ReactNode) | null | undefined;
export declare function getClimateScenarioIcon(layer: MapLayer): ((props: {
    className?: string;
}) => ReactNode) | null | undefined;
export {};
