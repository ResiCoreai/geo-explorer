import { formatSLD } from '../../explore/utils/format';
import { setLayerStyle, setSelectedFeatures } from '../../store/explore/slice';
import { sendWFSRequest } from '../../utils/geoserver';
import { getMetersPerPixelAtLatitude } from '../../utils/maplibre-utils';

export const identifyFeature = (layer_id, lngLat, zoom) => async (dispatch) => {
  const { lng, lat } = lngLat;
  const metersPerPixel = getMetersPerPixelAtLatitude(lat, zoom);
  const radiusInPixels = 10; // detect hits within 10 pixels of the cursor
  const radiusInMeters = radiusInPixels * metersPerPixel;
  const { data } = await sendWFSRequest({
    typeName: layer_id,
    cql_filter: `DWITHIN(geom, SRID=4326;POINT(${lng} ${lat}), ${radiusInMeters}, meters)`,
  });
  dispatch(setSelectedFeatures(data.features));
};
export const setLayerStyleSLD = (layer_id, style) => {
  return async (dispatch) => {
    const styleSLD = await formatSLD(layer_id, style);
    dispatch(setLayerStyle({ layer_id, style, styleSLD }));
  };
};
