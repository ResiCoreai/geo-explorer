import { MapLayer } from '../../store/explore/types';
export type LegendPanelProps = {
    layers: MapLayer[];
    selectedLayer: MapLayer;
};
export declare function LegendPanel({ layers, selectedLayer }: LegendPanelProps): import("react/jsx-runtime").JSX.Element;
