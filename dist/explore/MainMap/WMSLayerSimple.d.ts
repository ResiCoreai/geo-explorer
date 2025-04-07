import { MapLayer } from '../../store/explore/types';

type Props = {
  layer: MapLayer;
  prevLayer: MapLayer | null;
};
export declare function WMSLayerSimple({
  layer,
  prevLayer,
}: Props): import('react/jsx-runtime').JSX.Element;
export {};
