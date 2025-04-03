import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useMap } from 'react-map-gl/maplibre';
import { DURATION, RADIUS_MAX, RADIUS_MIN, RIPPLE_COLOR, RIPPLE_WIDTH, } from '../../../explore/MainMap/RippleOverlay/constants';
export function PolygonRipple({ feature }) {
    const { current: map } = useMap();
    const [points, setPoints] = useState([]);
    useEffect(() => {
        if (!map)
            return;
        const update = () => {
            var _a, _b;
            setPoints((_b = (_a = feature.geometry.coordinates[0]) === null || _a === void 0 ? void 0 : _a.map(([lon, lat]) => map.project([lon !== null && lon !== void 0 ? lon : 0, lat !== null && lat !== void 0 ? lat : 0]))) !== null && _b !== void 0 ? _b : []);
        };
        map.on('zoom', update);
        map.on('move', update);
        update();
        return () => {
            map.off('zoom', update);
            map.off('move', update);
        };
    }, []);
    const filterId = `${feature.id}`;
    return (_jsxs(_Fragment, { children: [_jsx("defs", { children: _jsxs("filter", { id: filterId, x: "-100%", y: "-100%", width: "400%", height: "400%", children: [_jsx("feMorphology", { id: `${filterId}_outer`, in: "SourceAlpha", operator: "dilate", radius: "10", result: "outer" }), _jsx("feMorphology", { id: `${filterId}_inner`, in: "SourceAlpha", operator: "dilate", radius: "0", result: "inner" }), _jsx("feComposite", { in: "outer", in2: "inner", operator: "out", result: "rippleAlpha" }), _jsx("feFlood", { id: `${filterId}_color`, floodColor: RIPPLE_COLOR, floodOpacity: "1", result: "ripple-color" }), _jsx("feComposite", { in: "ripple-color", in2: "rippleAlpha", operator: "in", result: "ripple" }), _jsx("feMerge", { children: _jsx("feMergeNode", { in: "ripple" }) })] }) }), _jsx("polygon", { points: points.map((p) => `${p.x},${p.y}`).join(' '), fill: "black", filter: `url(#${filterId})` }), _jsx("animate", { xlinkHref: `#${filterId}_outer`, attributeName: "radius", from: RADIUS_MIN + RIPPLE_WIDTH, to: RADIUS_MAX + RIPPLE_WIDTH, dur: DURATION, begin: "0s", repeatCount: "indefinite" }), _jsx("animate", { xlinkHref: `#${filterId}_inner`, attributeName: "radius", from: RADIUS_MIN, to: RADIUS_MAX, dur: DURATION, begin: "0s", repeatCount: "indefinite" }), _jsx("animate", { xlinkHref: `#${filterId}_color`, attributeName: "flood-opacity", from: 1, to: 0, dur: DURATION, begin: "0s", repeatCount: "indefinite" })] }));
}
