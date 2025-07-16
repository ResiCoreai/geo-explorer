import { bbox } from '@turf/turf';
import { useCallback, useContext, useEffect } from 'react';
import { useMap } from 'react-map-gl/maplibre';

import { GeoExplorerContext } from '@ncsa/geo-explorer/GeoExplorerProvider';
import {
  FIT_BOUNDS_PADDING,
  MAX_ZOOM_LEVEL,
  SIDEBAR_WIDTH,
} from '@ncsa/geo-explorer/config';
import { RootState, useSelector } from '@ncsa/geo-explorer/store';

const DEFAULT_BOUNDS: [number, number, number, number] = [
  -97.486882, 34.834377, -80.414128, 43.820904,
];

export function FitBounds() {
  const { current: map } = useMap();
  const { mapConfig } = useContext(GeoExplorerContext);

  const features = useSelector(
    (state: RootState) => state.explore.selectedFeatures,
  );

  const settingsOpen = useSelector(
    (state: RootState) =>
      state.explore.selectedLayer && state.explore.showLayerSettings,
  );
  const settingsExpanded = useSelector(
    (state: RootState) =>
      state.explore.selectedLayer && state.explore.layerSettingsExpanded,
  );
  const sidebarOpen = useSelector(
    (state: RootState) => state.explore.sidebarOpen,
  );

  const fitBoundsOptions = useCallback(() => {
    const layerSettingsHeight =
      document.querySelector('#layer-settings')?.getBoundingClientRect()
        .height ?? 0;
    return {
      padding: {
        top: FIT_BOUNDS_PADDING,
        right: FIT_BOUNDS_PADDING,
        left: (sidebarOpen ? SIDEBAR_WIDTH : 0) + FIT_BOUNDS_PADDING,
        bottom: layerSettingsHeight + FIT_BOUNDS_PADDING,
      },
    };
  }, [sidebarOpen]);

  useEffect(() => {
    if (!map) return;
    const update = () => {
      map.setPitch(mapConfig?.pitch ?? 0);
      map.fitBounds(mapConfig?.boundingBox ?? DEFAULT_BOUNDS, {
        ...fitBoundsOptions(),
        animate: false,
      });
    };
    update();
  }, [
    map,
    mapConfig,
    fitBoundsOptions,
    sidebarOpen,
    settingsOpen,
    settingsExpanded,
  ]);

  useEffect(() => {
    if (!map) return;
    if (features.length == 0) return;
    const [minX, minY, maxX, maxY] = bbox({
      type: 'FeatureCollection',
      features,
    });
    map.fitBounds([minX, minY, maxX, maxY], {
      maxZoom: MAX_ZOOM_LEVEL, // This is necessary for point layers
    });
  }, [map, features]);

  return null;
}
