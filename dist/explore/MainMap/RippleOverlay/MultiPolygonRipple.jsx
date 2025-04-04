import { PolygonRipple } from "../../../explore/MainMap/RippleOverlay/PolygonRipple";
export function MultiPolygonRipple({ feature }) {
  return feature.geometry.coordinates.map((polygonCoords, i) => (
    <PolygonRipple
      key={i}
      feature={{
        id: `${feature.id}_${i}`,
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: polygonCoords,
        },
        properties: {},
      }}
    />
  ));
}
