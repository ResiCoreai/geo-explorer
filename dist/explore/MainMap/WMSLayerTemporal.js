import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useMemo } from 'react';
import { Layer, Source, useMap } from 'react-map-gl/maplibre';
import { GeoExplorerContext } from '../../GeoExplorerProvider';
import { TILE_SIZE } from '../../config';
import { useDispatch } from '../../store';
import { setTimestampIdx } from '../../store/explore/slice';
import { nextCircular, prevCircular } from '../../utils/array';
export function WMSLayerTemporal({ layer, prevLayer }) {
    var _a, _b, _c;
    const { ogcClient } = useContext(GeoExplorerContext);
    const numTimestamps = layer.data.timestamps.length;
    const curTimestamp = numTimestamps > 0 ? layer.data.timestamps[layer.timestampIdx] : '';
    const prevTimestamp = (_a = prevCircular(layer.data.timestamps, layer.timestampIdx)) !== null && _a !== void 0 ? _a : '';
    const nextTimestamp = (_b = nextCircular(layer.data.timestamps, layer.timestampIdx)) !== null && _b !== void 0 ? _b : '';
    const tiles = useMemo(() => {
        const params = {
            layers: [layer.data.layer_id],
            styles: [layer.style_name],
            __style_version__: layer.version,
        };
        if (curTimestamp) {
            params['time'] = curTimestamp;
        }
        return ogcClient
            ? [ogcClient.makeWMSUrl(layer.data.ogc_service_url, params)]
            : [];
    }, [layer.timestampIdx, layer.version]);
    const prevTiles = useMemo(() => {
        const params = {
            layers: [layer.data.layer_id],
            styles: [layer.style_name],
            __style_version__: layer.version,
        };
        if (prevTimestamp) {
            params['time'] = prevTimestamp;
        }
        return ogcClient
            ? [ogcClient.makeWMSUrl(layer.data.ogc_service_url, params)]
            : [];
    }, [layer.timestampIdx, layer.version]);
    const nextTiles = useMemo(() => {
        const params = {
            layers: [layer.data.layer_id],
            styles: [layer.style_name],
            __style_version__: layer.version,
        };
        if (nextTimestamp) {
            params['time'] = nextTimestamp;
        }
        return ogcClient
            ? [ogcClient.makeWMSUrl(layer.data.ogc_service_url, params)]
            : [];
    }, [layer.timestampIdx, layer.version]);
    const dispatch = useDispatch();
    const { current: map } = useMap();
    useEffect(() => {
        if (!layer.playing)
            return;
        let scheduled = false;
        let timeoutId = -1;
        const checkIfNextTimestampLoaded = () => {
            if ((map === null || map === void 0 ? void 0 : map.isSourceLoaded(layer.data.layer_id + nextTimestamp)) &&
                !scheduled) {
                scheduled = true;
                timeoutId = setTimeout(() => {
                    dispatch(setTimestampIdx({
                        layer_id: layer.data.layer_id,
                        index: (layer.timestampIdx + 1) % layer.data.timestamps.length,
                    }));
                }, 1000);
            }
        };
        map === null || map === void 0 ? void 0 : map.on('sourcedata', checkIfNextTimestampLoaded);
        checkIfNextTimestampLoaded();
        return () => {
            clearTimeout(timeoutId);
            map === null || map === void 0 ? void 0 : map.off('sourcedata', checkIfNextTimestampLoaded);
        };
    }, [map, nextTimestamp, layer.playing]);
    return (_jsxs(_Fragment, { children: [_jsx(Source, { id: layer.data.layer_id + prevTimestamp, type: "raster", tiles: prevTiles, tileSize: TILE_SIZE, children: _jsx(Layer, { id: layer.data.layer_id + prevTimestamp, beforeId: (_c = prevLayer === null || prevLayer === void 0 ? void 0 : prevLayer.data.layer_id) !== null && _c !== void 0 ? _c : '', type: "raster", layout: {
                        visibility: layer.visible ? 'visible' : 'none',
                    }, paint: {
                        'raster-opacity': 0,
                    } }) }, layer.data.layer_id + prevTimestamp), _jsx(Source, { id: layer.data.layer_id + curTimestamp, type: "raster", tiles: tiles, tileSize: TILE_SIZE, children: _jsx(Layer, { id: layer.data.layer_id + curTimestamp, beforeId: layer.data.layer_id + prevTimestamp, type: "raster", layout: {
                        visibility: layer.visible ? 'visible' : 'none',
                    }, paint: {
                        'raster-opacity': layer.style.layerOpacity,
                    } }) }, layer.data.layer_id + curTimestamp), _jsx(Source, { id: layer.data.layer_id + nextTimestamp, type: "raster", tiles: nextTiles, tileSize: TILE_SIZE, children: _jsx(Layer, { id: layer.data.layer_id + nextTimestamp, beforeId: layer.data.layer_id + curTimestamp, type: "raster", layout: {
                        visibility: layer.visible ? 'visible' : 'none',
                    }, paint: {
                        'raster-opacity': 0,
                    } }) }, layer.data.layer_id + nextTimestamp), _jsx(Layer, { id: layer.data.layer_id, beforeId: layer.data.layer_id + nextTimestamp, type: "background", layout: {
                    visibility: 'none',
                } })] }));
}
//# sourceMappingURL=WMSLayerTemporal.js.map