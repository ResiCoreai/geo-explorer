import { useCallback, useContext, useEffect } from 'react';
import { useMap } from 'react-map-gl/maplibre';

import { GeoExplorerContext } from '@ncsa/geo-explorer/GeoExplorerProvider';
import {
  DEFAULT_BOUNDS,
  FIT_BOUNDS_PADDING,
  SIDEBAR_WIDTH,
} from '@ncsa/geo-explorer/config';
import { RootState, useSelector } from '@ncsa/geo-explorer/store';

type FitBoundsProps = {
  initialViewApplied?: boolean;
};

export function FitBounds({ initialViewApplied = false }: FitBoundsProps) {
  const { current: map } = useMap();
  const { mapConfig } = useContext(GeoExplorerContext);
  const mapLayers = useSelector((state: RootState) => state.explore.mapLayers);

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
    if (!initialViewApplied) return; // skip on first load

    const update = () => {
      map.setPitch(mapConfig?.pitch ?? 0);

      // Collect all valid bounding boxes from mapLayers
      const validBounds = mapLayers
        .map((mapLayer) => mapLayer.data.boundingBox)
        .filter(
          (b): b is [number, number, number, number] =>
            Array.isArray(b) &&
            b.length === 4 &&
            b.every((v) => typeof v === 'number'),
        );

      let targetBounds;

      if (validBounds.length > 0) {
        // Compute the union bounding box
        const minX = Math.min(...validBounds.map((b) => b[0]));
        const minY = Math.min(...validBounds.map((b) => b[1]));
        const maxX = Math.max(...validBounds.map((b) => b[2]));
        const maxY = Math.max(...validBounds.map((b) => b[3]));

        targetBounds = [minX, minY, maxX, maxY] as [
          number,
          number,
          number,
          number,
        ];
      } else {
        // No valid bounding boxes, fall back to mapConfig bounding box or default bounds
        targetBounds = mapConfig?.boundingBox ?? DEFAULT_BOUNDS;
      }

      map.fitBounds(targetBounds, {
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
    mapLayers,
  ]);

  return null;
}
