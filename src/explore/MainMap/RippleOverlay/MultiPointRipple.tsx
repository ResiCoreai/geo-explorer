import { Feature, MultiPoint } from 'geojson';

import { PointRipple } from '@ncsa/geo-explorer/explore/MainMap/RippleOverlay/PointRipple';

type Props = {
  feature: Feature<MultiPoint>;
};

export function MultiPointRipple({ feature }: Props) {
  return feature.geometry.coordinates.map((pointCoords, i) => (
    <PointRipple
      key={i}
      feature={{
        id: `${feature.id}_${i}`,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: pointCoords,
        },
        properties: {},
      }}
    />
  ));
}
