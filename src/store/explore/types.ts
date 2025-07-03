import { Dataset } from '@ncsa/geo-explorer/types';

export type MapLayer = {
  data: Dataset;
  playing: boolean;
  timestampIdx: number;
  visible: boolean;
  version: number; // used to keep track of style updates
  style_name: string;
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
