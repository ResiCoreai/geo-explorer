import { useCallback, useContext, useEffect } from 'react';
import { useMap } from 'react-map-gl/maplibre';
import { GeoExplorerContext } from '../../../GeoExplorerProvider';
import { DEFAULT_BOUNDS, FIT_BOUNDS_PADDING, SIDEBAR_WIDTH, } from '../../../config';
import { useSelector } from '../../../store';
export function FitBounds() {
    const { current: map } = useMap();
    const { mapConfig } = useContext(GeoExplorerContext);
    const initializing = useSelector((state) => state.explore.initializing);
    const mapLayers = useSelector((state) => state.explore.mapLayers);
    const settingsOpen = useSelector((state) => state.explore.selectedLayer && state.explore.showLayerSettings);
    const settingsExpanded = useSelector((state) => state.explore.selectedLayer && state.explore.layerSettingsExpanded);
    const sidebarOpen = useSelector((state) => state.explore.sidebarOpen);
    const fitBoundsOptions = useCallback(() => {
        var _a, _b;
        const layerSettingsHeight = (_b = (_a = document.querySelector('#layer-settings')) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().height) !== null && _b !== void 0 ? _b : 0;
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
        if (!map)
            return;
        if (initializing)
            return;
        const update = () => {
            var _a, _b;
            map.setPitch((_a = mapConfig === null || mapConfig === void 0 ? void 0 : mapConfig.pitch) !== null && _a !== void 0 ? _a : 0);
            // Collect all valid bounding boxes from mapLayers
            const validBounds = mapLayers
                .map((mapLayer) => mapLayer.data.boundingBox)
                .filter((b) => Array.isArray(b) &&
                b.length === 4 &&
                b.every((v) => typeof v === 'number'));
            let targetBounds;
            if (validBounds.length > 0) {
                // Compute the union bounding box
                const minX = Math.min(...validBounds.map((b) => b[0]));
                const minY = Math.min(...validBounds.map((b) => b[1]));
                const maxX = Math.max(...validBounds.map((b) => b[2]));
                const maxY = Math.max(...validBounds.map((b) => b[3]));
                targetBounds = [minX, minY, maxX, maxY];
            }
            else {
                // No valid bounding boxes, fall back to mapConfig bounding box or default bounds
                targetBounds = (_b = mapConfig === null || mapConfig === void 0 ? void 0 : mapConfig.boundingBox) !== null && _b !== void 0 ? _b : DEFAULT_BOUNDS;
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
    useEffect(() => {
        if (!map)
            return;
        if (!initializing) {
            const initMapBound = mapConfig === null || mapConfig === void 0 ? void 0 : mapConfig.boundingBox;
            if (initMapBound) {
                const sw = [initMapBound[0], initMapBound[1]];
                const ne = [initMapBound[2], initMapBound[3]];
                map.fitBounds([sw, ne], {
                    padding: 40,
                    animate: false,
                });
            }
            else {
                map.fitBounds(DEFAULT_BOUNDS, { padding: 40, animate: false });
            }
        }
    }, [map, initializing]);
    return null;
}
//# sourceMappingURL=FitBounds.js.map