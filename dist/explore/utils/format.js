import SLDParser from 'geostyler-sld-parser';
import { store } from '../../store';
function createPointSymbolizer(style) {
    return {
        kind: 'Mark',
        wellKnownName: 'circle',
        fillOpacity: style.fillOpacity,
        color: style.fillColor,
        strokeWidth: style.strokeWidth * devicePixelRatio,
        strokeColor: style.strokeColor,
        strokeOpacity: style.strokeOpacity,
        radius: style.radius * devicePixelRatio,
    };
}
function createLineSymbolizer(style) {
    return {
        kind: 'Line',
        width: style.strokeWidth * devicePixelRatio,
        color: style.strokeColor,
        opacity: style.strokeOpacity,
    };
}
function createPolygonSymbolizer(style) {
    return {
        kind: 'Fill',
        fillOpacity: style.fillOpacity,
        color: style.fillColor,
        outlineWidth: style.strokeWidth * devicePixelRatio,
        outlineColor: style.strokeColor,
        outlineOpacity: style.strokeOpacity,
    };
}
function createSymbolizer(type, style) {
    switch (type) {
        case 'point':
            return createPointSymbolizer(style);
        case 'line':
            return createLineSymbolizer(style);
        case 'polygon':
            return createPolygonSymbolizer(style);
    }
}
function createStyleRules(type, style) {
    const symbolizer = createSymbolizer(type, style);
    return symbolizer
        ? [
            {
                name: '',
                symbolizers: [symbolizer],
            },
        ]
        : [];
}
export async function formatSLD(layer_id, style) {
    const selectedLayers = store.getState().explore.mapLayers;
    const layer = selectedLayers.find((layer) => layer.data.layer_id === layer_id);
    if (layer.data.dataset_info.dataset_type === 'raster') {
        return '';
    }
    const geoStylerStyle = {
        name: layer_id,
        rules: createStyleRules(layer.data.dataset_info.feature_type, style),
    };
    const { output: styleSLD } = await new SLDParser().writeStyle(geoStylerStyle);
    return styleSLD !== null && styleSLD !== void 0 ? styleSLD : '';
}
