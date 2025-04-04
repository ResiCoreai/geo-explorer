import { MapLayer } from "../../store/explore/types";
type Props = {
  layer: MapLayer;
  prevLayer: MapLayer | null;
};
export declare function WMSLayerTemporal({
  layer,
  prevLayer,
}: Props): import("react/jsx-runtime").JSX.Element;
export {};
