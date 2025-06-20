import { useEffect, useState } from 'react';
import { useMap } from 'react-map-gl/maplibre';

import { useImplementation } from '@ncsa/geo-explorer/hooks/useImplementation';
import { RootState, useSelector } from '@ncsa/geo-explorer/store';

export function RippleOverlay() {
  const { RippleEffects } = useImplementation();

  const { current: map } = useMap();

  const features = useSelector(
    (state: RootState) => state.explore.selectedFeatures,
  );

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!map) return;

    const resize = () => {
      setWidth(map.getCanvas().getBoundingClientRect().width);
      setHeight(map.getCanvas().getBoundingClientRect().height);
    };

    map.on('resize', resize);
    resize();

    return () => {
      map.off('resize', resize);
    };
  }, [map]);

  return (
    <svg
      width={width}
      height={height}
      className="absolute left-0 top-0 pointer-events-none"
    >
      {features.map((feature) => (
        <RippleEffects key={feature.id} feature={feature} />
      ))}
    </svg>
  );
}
