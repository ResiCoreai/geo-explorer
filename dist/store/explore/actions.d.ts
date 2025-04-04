import { LngLat } from "maplibre-gl";
import { AppDispatch } from "../../store";
import { MapLayerStyle } from "../../store/explore/types";
export declare const identifyFeature: (
  layer_id: string,
  lngLat: LngLat,
  zoom: number,
) => (dispatch: AppDispatch) => Promise<void>;
export declare const setLayerStyleSLD: (
  layer_id: string,
  style: MapLayerStyle,
) => (dispatch: AppDispatch) => Promise<void>;
