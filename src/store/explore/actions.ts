import { LngLat } from 'maplibre-gl';

import { formatSLD } from '@ncsa/geo-explorer/explore/utils/format';
import { AppDispatch } from '@ncsa/geo-explorer/store';
import {
  setLayerStyle,
  setSelectedFeatures,
} from '@ncsa/geo-explorer/store/explore/slice';
import { MapLayerStyle } from '@ncsa/geo-explorer/store/explore/types';
import { Dataset } from '@ncsa/geo-explorer/types';
import { OGCClient } from '@ncsa/geo-explorer/utils/ogcClient';

export const identifyFeature =
  (ogcClient: OGCClient, dataset: Dataset, lngLat: LngLat, zoom: number) =>
  async (dispatch: AppDispatch) => {
    dispatch(
      setSelectedFeatures(
        await ogcClient.identifyFeature(dataset, lngLat, zoom),
      ),
    );
  };

export const setLayerStyleSLD = (layer_id: string, style: MapLayerStyle) => {
  return async (dispatch: AppDispatch) => {
    const styleSLD = await formatSLD(layer_id, style);
    dispatch(setLayerStyle({ layer_id, style, styleSLD }));
  };
};
