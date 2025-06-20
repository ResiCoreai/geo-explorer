import { bbox } from '@turf/turf';
import { useEffect } from 'react';
import { useMap } from 'react-map-gl/maplibre';

import {
  FIT_BOUNDS_PADDING,
  LAYER_SETTINGS_HEIGHT,
  MAX_ZOOM_LEVEL,
  SIDEBAR_WIDTH,
} from '@ncsa/geo-explorer/config';
import { RootState, useSelector } from '@ncsa/geo-explorer/store';

export function FitBounds() {
  const { current: map } = useMap();

  const features = useSelector(
    (state: RootState) => state.explore.selectedFeatures,
  );

  const settingsOpen = useSelector(
    (state: RootState) =>
      state.explore.selectedLayer && state.explore.showLayerSettings,
  );

  useEffect(() => {
    if (features.length > 0) {
      const [minX, minY, maxX, maxY] = bbox({
        type: 'FeatureCollection',
        features,
      });
      map?.fitBounds([minX, minY, maxX, maxY], {
        maxZoom: MAX_ZOOM_LEVEL, // This is necessary for point layers
        padding: {
          top: FIT_BOUNDS_PADDING,
          right: FIT_BOUNDS_PADDING,
          left: SIDEBAR_WIDTH + FIT_BOUNDS_PADDING,
          bottom:
            (settingsOpen ? LAYER_SETTINGS_HEIGHT : 0) + FIT_BOUNDS_PADDING,
        },
      });
    }
  }, [features]);

  return null;
}
