import { MapLayer } from '../../store/explore/types';
export type WMSLayerProps = {
    layer: MapLayer;
    prevLayer: MapLayer | null;
};
export declare function WMSLayer({ layer, prevLayer }: WMSLayerProps): import("react/jsx-runtime").JSX.Element;
