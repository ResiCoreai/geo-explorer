import {
  Feature,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
} from 'geojson';

import { LineRipple } from '@ncsa/geo-explorer/explore/MainMap/RippleOverlay/LineRipple';
import { MultiLineRipple } from '@ncsa/geo-explorer/explore/MainMap/RippleOverlay/MultiLineRipple';
import { MultiPointRipple } from '@ncsa/geo-explorer/explore/MainMap/RippleOverlay/MultiPointRipple';
import { MultiPolygonRipple } from '@ncsa/geo-explorer/explore/MainMap/RippleOverlay/MultiPolygonRipple';
import { PointRipple } from '@ncsa/geo-explorer/explore/MainMap/RippleOverlay/PointRipple';
import { PolygonRipple } from '@ncsa/geo-explorer/explore/MainMap/RippleOverlay/PolygonRipple';

export type RippleEffectsProps = {
  feature: Feature;
};

export function RippleEffects({ feature }: RippleEffectsProps) {
  switch (feature.geometry.type) {
    case 'Point':
      return <PointRipple feature={feature as Feature<Point>} />;
    case 'MultiPoint':
      return <MultiPointRipple feature={feature as Feature<MultiPoint>} />;
    case 'LineString':
      return <LineRipple feature={feature as Feature<LineString>} />;
    case 'MultiLineString':
      return <MultiLineRipple feature={feature as Feature<MultiLineString>} />;
    case 'Polygon':
      return <PolygonRipple feature={feature as Feature<Polygon>} />;
    case 'MultiPolygon':
      return <MultiPolygonRipple feature={feature as Feature<MultiPolygon>} />;
    case 'GeometryCollection':
      return null;
  }
}
