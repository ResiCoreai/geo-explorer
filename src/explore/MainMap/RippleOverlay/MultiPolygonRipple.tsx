import { Feature, MultiPolygon } from 'geojson';

import { PolygonRipple } from '@ncsa/geo-explorer/explore/MainMap/RippleOverlay/PolygonRipple';

type Props = {
  feature: Feature<MultiPolygon>;
};

export function MultiPolygonRipple({ feature }: Props) {
  return feature.geometry.coordinates.map((polygonCoords, i) => (
    <PolygonRipple
      key={i}
      feature={{
        id: `${feature.id}_${i}`,
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: polygonCoords,
        },
        properties: {},
      }}
    />
  ));
}
