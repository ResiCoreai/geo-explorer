import { jsx as _jsx } from "react/jsx-runtime";
import { PolygonRipple } from '../../../explore/MainMap/RippleOverlay/PolygonRipple';
export function MultiPolygonRipple({ feature }) {
    return feature.geometry.coordinates.map((polygonCoords, i) => (_jsx(PolygonRipple, { feature: {
            id: `${feature.id}_${i}`,
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: polygonCoords,
            },
            properties: {},
        } }, i)));
}
