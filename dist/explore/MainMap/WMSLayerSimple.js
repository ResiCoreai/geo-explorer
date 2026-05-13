import { jsx as _jsx } from "react/jsx-runtime";
import { useContext, useMemo } from 'react';
import { Layer, Source } from 'react-map-gl/maplibre';
import { GeoExplorerContext } from '../../GeoExplorerProvider';
import { TILE_SIZE } from '../../config';
export function WMSLayerSimple({ layer, prevLayer }) {
    var _a;
    const { ogcClient } = useContext(GeoExplorerContext);
    const tiles = useMemo(() => {
        const params = {
            layers: [layer.data.layer_id],
            styles: [layer.style_name],
            __style_version__: layer.version,
        };
        return ogcClient
            ? [ogcClient.makeWMSUrl(layer.data.ogc_service_url, params)]
            : [];
    }, [layer.version]);
    return (_jsx(Source, { id: layer.data.layer_id, type: "raster", tiles: tiles, tileSize: TILE_SIZE, children: _jsx(Layer, { id: layer.data.layer_id, beforeId: (_a = prevLayer === null || prevLayer === void 0 ? void 0 : prevLayer.data.layer_id) !== null && _a !== void 0 ? _a : '', type: "raster", layout: {
                visibility: layer.visible ? 'visible' : 'none',
            }, paint: {
                'raster-opacity': layer.style.layerOpacity,
            } }) }));
}
//# sourceMappingURL=WMSLayerSimple.js.map