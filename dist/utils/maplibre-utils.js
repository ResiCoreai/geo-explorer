const earthRadius = 6371008.8;
const earthCircumference = 2 * Math.PI * earthRadius;
const DEFAULT_MIN_ZOOM = 0;
const DEFAULT_MAX_ZOOM = 25.5;
const MAX_MERCATOR_LATITUDE = 85.051129;
const DEG_TO_RAD = Math.PI / 180;
function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}
function degToRad(a) {
  return a * DEG_TO_RAD;
}
function getLatitudeScale(lat) {
  return Math.cos(
    degToRad(clamp(lat, -MAX_MERCATOR_LATITUDE, MAX_MERCATOR_LATITUDE)),
  );
}
/**
 * Ported from: https://github.com/maplibre/maplibre-native/blob/e7f66f98ab8025e21d31b91a92c549d8b200fed5/include/mbgl/util/projection.hpp#L47
 */
export function getMetersPerPixelAtLatitude(lat, zoom) {
  const constrainedZoom = clamp(zoom, DEFAULT_MIN_ZOOM, DEFAULT_MAX_ZOOM);
  const constrainedScale = Math.pow(2.0, constrainedZoom);
  return (
    (getLatitudeScale(lat) * earthCircumference) / (constrainedScale * 512.0)
  );
}
