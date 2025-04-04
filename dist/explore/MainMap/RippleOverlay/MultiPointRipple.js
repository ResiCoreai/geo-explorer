import { jsx as _jsx } from "react/jsx-runtime";
import { PointRipple } from "../../../explore/MainMap/RippleOverlay/PointRipple";
export function MultiPointRipple({ feature }) {
  return feature.geometry.coordinates.map((pointCoords, i) =>
    _jsx(
      PointRipple,
      {
        feature: {
          id: `${feature.id}_${i}`,
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: pointCoords,
          },
          properties: {},
        },
      },
      i,
    ),
  );
}
