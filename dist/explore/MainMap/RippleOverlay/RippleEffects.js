import { jsx as _jsx } from "react/jsx-runtime";
import { LineRipple } from '../../../explore/MainMap/RippleOverlay/LineRipple';
import { MultiLineRipple } from '../../../explore/MainMap/RippleOverlay/MultiLineRipple';
import { MultiPointRipple } from '../../../explore/MainMap/RippleOverlay/MultiPointRipple';
import { MultiPolygonRipple } from '../../../explore/MainMap/RippleOverlay/MultiPolygonRipple';
import { PointRipple } from '../../../explore/MainMap/RippleOverlay/PointRipple';
import { PolygonRipple } from '../../../explore/MainMap/RippleOverlay/PolygonRipple';
export function RippleEffects({ feature }) {
    switch (feature.geometry.type) {
        case 'Point':
            return _jsx(PointRipple, { feature: feature });
        case 'MultiPoint':
            return _jsx(MultiPointRipple, { feature: feature });
        case 'LineString':
            return _jsx(LineRipple, { feature: feature });
        case 'MultiLineString':
            return _jsx(MultiLineRipple, { feature: feature });
        case 'Polygon':
            return _jsx(PolygonRipple, { feature: feature });
        case 'MultiPolygon':
            return _jsx(MultiPolygonRipple, { feature: feature });
        case 'GeometryCollection':
            return null;
    }
}
