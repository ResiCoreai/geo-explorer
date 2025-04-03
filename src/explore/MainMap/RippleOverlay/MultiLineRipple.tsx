import { Feature, MultiLineString } from 'geojson';

import { LineRipple } from '@ncsa/geo-explorer/explore/MainMap/RippleOverlay/LineRipple';

type Props = {
  feature: Feature<MultiLineString>;
};

export function MultiLineRipple({ feature }: Props) {
  return feature.geometry.coordinates.map((lineCoords, i) => (
    <LineRipple
      key={i}
      feature={{
        id: `${feature.id}_${i}`,
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: lineCoords,
        },
        properties: {},
      }}
    />
  ));
}
