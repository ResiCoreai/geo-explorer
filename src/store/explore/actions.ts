import { LngLat } from 'maplibre-gl';

import { formatSLD } from '@ncsa/geo-explorer/explore/utils/format';
import { AppDispatch } from '@ncsa/geo-explorer/store';
import {
  SimpleFeatureCollection,
  setLayerStyle,
  setSelectedFeatures,
} from '@ncsa/geo-explorer/store/explore/slice';
import { MapLayerStyle } from '@ncsa/geo-explorer/store/explore/types';
import { sendWFSRequest } from '@ncsa/geo-explorer/utils/geoserver';
import { getMetersPerPixelAtLatitude } from '@ncsa/geo-explorer/utils/maplibre-utils';

export const identifyFeature =
  (layer_id: string, lngLat: LngLat, zoom: number) =>
  async (dispatch: AppDispatch) => {
    const { lng, lat } = lngLat;

    const metersPerPixel = getMetersPerPixelAtLatitude(lat, zoom);
    const radiusInPixels = 10; // detect hits within 10 pixels of the cursor
    const radiusInMeters = radiusInPixels * metersPerPixel;

    const { data } = await sendWFSRequest<SimpleFeatureCollection>({
      typeName: layer_id,
      cql_filter: `DWITHIN(geom, SRID=4326;POINT(${lng} ${lat}), ${radiusInMeters}, meters)`,
    });
    dispatch(setSelectedFeatures(data.features));
  };

export const setLayerStyleSLD = (layer_id: string, style: MapLayerStyle) => {
  return async (dispatch: AppDispatch) => {
    const styleSLD = await formatSLD(layer_id, style);
    dispatch(setLayerStyle({ layer_id, style, styleSLD }));
  };
};
