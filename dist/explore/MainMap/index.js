import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from 'react';
import { FullscreenControl, Layer, Map, NavigationControl, Source, } from 'react-map-gl/maplibre';
import { GeoExplorerContext } from '../../GeoExplorerProvider';
import { provideMapInstanceToHandlers } from '../../MapAccessRegistery';
import { FitBounds } from '../../explore/MainMap/controls/FitBounds';
import { useImplementation } from '../../hooks/useImplementation';
import { store, useDispatch, useSelector, } from '../../store';
import { setSelectedFeatures } from '../../store/explore/slice';
import { isAbortError } from '../../utils/maplibre-utils';
export function MainMap() {
    var _a, _b, _c, _d, _e, _f;
    const { RippleOverlay, WMSLayer, SelectedFeatures } = useImplementation();
    const dispatch = useDispatch();
    const { accessToken, ogcClient, isProtectedResource, mapConfig } = useContext(GeoExplorerContext);
    const mapLayers = useSelector((state) => state.explore.mapLayers);
    const selectedLayer = useSelector((state) => state.explore.mapLayers.find((layer) => layer.data.layer_id === state.explore.selectedLayer));
    const baseMaps = useSelector((state) => state.explore.baseMaps);
    const selectedBaseMap = useSelector((state) => state.explore.selectedBaseMap);
    return (_jsxs(Map, { id: "map", attributionControl: false, transformRequest: (url) => {
            if (isProtectedResource === null || isProtectedResource === void 0 ? void 0 : isProtectedResource(url)) {
                const layer_id = new URLSearchParams(url).get('layers');
                const mapLayers = store.getState().explore.mapLayers;
                const layer = mapLayers.find((layer) => layer.data.layer_id === layer_id);
                const shouldUseClientStyle = Boolean(layer.styleSLD && layer.version > 0);
                if (shouldUseClientStyle) {
                    // return {
                    //   url: url + '&sld_body=' + encodeURIComponent(layer.styleSLD!),
                    //   headers: {
                    //     Authorization: `Bearer ${accessToken}`,
                    //   },
                    // };
                    return {
                        url,
                        method: 'POST',
                        body: layer.styleSLD,
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    };
                }
                return {
                    url,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
            }
            return undefined;
        }, onError: (e) => {
            console.error(e.error.stack);
            if (isAbortError(e.error)) {
                // do nothing
            }
        }, onLoad: (e) => provideMapInstanceToHandlers(e.target), interactiveLayerIds: ['storage'], onClick: (e) => {
            if (selectedLayer && selectedLayer.data.layer_type !== 'raster') {
                ogcClient === null || ogcClient === void 0 ? void 0 : ogcClient.identifyFeature(e, selectedLayer.data).then((features) => {
                    dispatch(setSelectedFeatures(features));
                });
            }
        }, cursor: selectedLayer ? 'crosshair' : '', maxPitch: (_a = mapConfig === null || mapConfig === void 0 ? void 0 : mapConfig.maxPitch) !== null && _a !== void 0 ? _a : 85, children: [_jsx(NavigationControl, { position: "top-right", visualizePitch: true }), _jsx(FullscreenControl, { position: "top-right" }), baseMaps.length > 0 && (_jsx(Source, { type: "raster", tiles: [
                    (_e = (_c = (_b = baseMaps.find((b) => b.layer_id === selectedBaseMap)) === null || _b === void 0 ? void 0 : _b.tile_url_template) !== null && _c !== void 0 ? _c : (_d = baseMaps[0]) === null || _d === void 0 ? void 0 : _d.tile_url_template) !== null && _e !== void 0 ? _e : '',
                ], tileSize: (_f = mapConfig === null || mapConfig === void 0 ? void 0 : mapConfig.tileSize) !== null && _f !== void 0 ? _f : 256, children: _jsx(Layer, { type: "raster" }) })), mapLayers.map((layer, index) => {
                var _a;
                return (_jsx(WMSLayer, { layer: layer, prevLayer: (_a = mapLayers[index - 1]) !== null && _a !== void 0 ? _a : null }, layer.data.layer_id));
            }), _jsx(RippleOverlay, {}), _jsx(SelectedFeatures, {}), _jsx(FitBounds, {})] }));
}
//# sourceMappingURL=index.js.map