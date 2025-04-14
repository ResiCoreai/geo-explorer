import { LngLat } from 'maplibre-gl';

import { formatSLD } from '@ncsa/geo-explorer/explore/utils/format';
import { AppDispatch } from '@ncsa/geo-explorer/store';
import {
  setLayerStyle,
  setSelectedFeatures,
} from '@ncsa/geo-explorer/store/explore/slice';
import { MapLayerStyle } from '@ncsa/geo-explorer/store/explore/types';
import { OGCClient } from '@ncsa/geo-explorer/utils/ogcClient';

export const identifyFeature =
  (ogcClient: OGCClient, layer_id: string, lngLat: LngLat, zoom: number) =>
  async (dispatch: AppDispatch) => {
    dispatch(
      setSelectedFeatures(
        await ogcClient.identifyFeature(layer_id, lngLat, zoom),
      ),
    );
  };

export const setLayerStyleSLD = (layer_id: string, style: MapLayerStyle) => {
  return async (dispatch: AppDispatch) => {
    const styleSLD = await formatSLD(layer_id, style);
    dispatch(setLayerStyle({ layer_id, style, styleSLD }));
  };
};
