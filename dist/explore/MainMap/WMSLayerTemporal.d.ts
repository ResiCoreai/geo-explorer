import { MapLayer } from '../../store/explore/types';
export type WMSLayerTemporalProps = {
    layer: MapLayer;
    prevLayer: MapLayer | null;
};
export declare function WMSLayerTemporal({ layer, prevLayer }: WMSLayerTemporalProps): import("react/jsx-runtime").JSX.Element;
