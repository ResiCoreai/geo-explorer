import { Feature, Point } from 'geojson';
import { Point as MapLibrePoint } from 'maplibre-gl';
import { useEffect, useState } from 'react';
import { useMap } from 'react-map-gl/maplibre';

import {
  DURATION,
  RADIUS_MAX,
  RADIUS_MIN,
  RIPPLE_COLOR,
  RIPPLE_WIDTH,
} from '@ncsa/geo-explorer/explore/MainMap/RippleOverlay/constants';

type Props = {
  feature: Feature<Point>;
};

const RADIUS_BASE = 5;

export function PointRipple({ feature }: Props) {
  const { current: map } = useMap();

  const [point, setPoint] = useState<MapLibrePoint | null>(null);

  useEffect(() => {
    if (!map) return;

    const update = () => {
      const lon = feature.geometry.coordinates[0] ?? 0;
      const lat = feature.geometry.coordinates[1] ?? 0;
      setPoint(map.project([lon, lat]));
    };

    map.on('zoom', update);
    map.on('move', update);
    update();

    return () => {
      map.off('zoom', update);
      map.off('move', update);
    };
  }, []);

  const filterId = `${feature.id}`;

  if (!point) return null;

  return (
    <>
      <circle
        id={`${filterId}_circle`}
        cx={point.x}
        cy={point.y}
        r={0}
        stroke={RIPPLE_COLOR}
        strokeWidth={RIPPLE_WIDTH}
        strokeOpacity={1}
        fill="none"
      />
      <animate
        xlinkHref={`#${filterId}_circle`}
        attributeName="r"
        from={RADIUS_MIN + RADIUS_BASE}
        to={RADIUS_MAX + RADIUS_BASE}
        dur={DURATION}
        begin="0s"
        repeatCount="indefinite"
      />
      <animate
        xlinkHref={`#${filterId}_circle`}
        attributeName="stroke-opacity"
        from={1}
        to={0}
        dur={DURATION}
        begin="0s"
        repeatCount="indefinite"
      />
    </>
  );
}
