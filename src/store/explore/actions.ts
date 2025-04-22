import { formatSLD } from '@ncsa/geo-explorer/explore/utils/format';
import { AppDispatch } from '@ncsa/geo-explorer/store';
import { setLayerStyle } from '@ncsa/geo-explorer/store/explore/slice';
import { MapLayerStyle } from '@ncsa/geo-explorer/store/explore/types';

export const setLayerStyleSLD = (layer_id: string, style: MapLayerStyle) => {
  return async (dispatch: AppDispatch) => {
    const styleSLD = await formatSLD(layer_id, style);
    dispatch(setLayerStyle({ layer_id, style, styleSLD }));
  };
};
