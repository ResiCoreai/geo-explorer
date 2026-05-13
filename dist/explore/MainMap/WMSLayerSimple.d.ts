import { MapLayer } from '../../store/explore/types';
export type WMSLayerSimpleProps = {
    layer: MapLayer;
    prevLayer: MapLayer | null;
};
export declare function WMSLayerSimple({ layer, prevLayer }: WMSLayerSimpleProps): import("react/jsx-runtime").JSX.Element;
