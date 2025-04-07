import { jsx as _jsx } from 'react/jsx-runtime';

import { LineRipple } from '../../../explore/MainMap/RippleOverlay/LineRipple';

export function MultiLineRipple({ feature }) {
  return feature.geometry.coordinates.map((lineCoords, i) =>
    _jsx(
      LineRipple,
      {
        feature: {
          id: `${feature.id}_${i}`,
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: lineCoords,
          },
          properties: {},
        },
      },
      i,
    ),
  );
}
