import { AppDispatch } from '../../store';
import { MapLayerStyle } from '../../store/explore/types';
export declare const setLayerStyleSLD: (layer_id: string, style: MapLayerStyle) => (dispatch: AppDispatch) => Promise<void>;
