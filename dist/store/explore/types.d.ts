import { Dataset } from "../../utils/types";
export type MapLayer = {
  data: Dataset;
  playing: boolean;
  timestampIdx: number;
  visible: boolean;
  version: number;
  style: MapLayerStyle;
  styleSLD: string;
};
export type MapLayerStyle = {
  layerOpacity: number;
  radius: number;
  fillColor: string;
  fillOpacity: number;
  strokeWidth: number;
  strokeColor: string;
  strokeOpacity: number;
};
