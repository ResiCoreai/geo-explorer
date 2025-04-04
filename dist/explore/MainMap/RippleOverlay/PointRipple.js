import {
  jsx as _jsx,
  Fragment as _Fragment,
  jsxs as _jsxs,
} from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useMap } from "react-map-gl/maplibre";
import {
  DURATION,
  RADIUS_MAX,
  RADIUS_MIN,
  RIPPLE_COLOR,
  RIPPLE_WIDTH,
} from "../../../explore/MainMap/RippleOverlay/constants";
const RADIUS_BASE = 5;
export function PointRipple({ feature }) {
  const { current: map } = useMap();
  const [point, setPoint] = useState(null);
  useEffect(() => {
    if (!map) return;
    const update = () => {
      var _a, _b;
      const lon =
        (_a = feature.geometry.coordinates[0]) !== null && _a !== void 0
          ? _a
          : 0;
      const lat =
        (_b = feature.geometry.coordinates[1]) !== null && _b !== void 0
          ? _b
          : 0;
      setPoint(map.project([lon, lat]));
    };
    map.on("zoom", update);
    map.on("move", update);
    update();
    return () => {
      map.off("zoom", update);
      map.off("move", update);
    };
  }, []);
  const filterId = `${feature.id}`;
  if (!point) return null;
  return _jsxs(_Fragment, {
    children: [
      _jsx("circle", {
        id: `${filterId}_circle`,
        cx: point.x,
        cy: point.y,
        r: 0,
        stroke: RIPPLE_COLOR,
        strokeWidth: RIPPLE_WIDTH,
        strokeOpacity: 1,
        fill: "none",
      }),
      _jsx("animate", {
        xlinkHref: `#${filterId}_circle`,
        attributeName: "r",
        from: RADIUS_MIN + RADIUS_BASE,
        to: RADIUS_MAX + RADIUS_BASE,
        dur: DURATION,
        begin: "0s",
        repeatCount: "indefinite",
      }),
      _jsx("animate", {
        xlinkHref: `#${filterId}_circle`,
        attributeName: "stroke-opacity",
        from: 1,
        to: 0,
        dur: DURATION,
        begin: "0s",
        repeatCount: "indefinite",
      }),
    ],
  });
}
