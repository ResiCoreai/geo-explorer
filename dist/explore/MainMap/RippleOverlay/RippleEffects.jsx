import { LineRipple } from "../../../explore/MainMap/RippleOverlay/LineRipple";
import { MultiLineRipple } from "../../../explore/MainMap/RippleOverlay/MultiLineRipple";
import { MultiPointRipple } from "../../../explore/MainMap/RippleOverlay/MultiPointRipple";
import { MultiPolygonRipple } from "../../../explore/MainMap/RippleOverlay/MultiPolygonRipple";
import { PointRipple } from "../../../explore/MainMap/RippleOverlay/PointRipple";
import { PolygonRipple } from "../../../explore/MainMap/RippleOverlay/PolygonRipple";
export function RippleEffects({ feature }) {
  switch (feature.geometry.type) {
    case "Point":
      return <PointRipple feature={feature} />;
    case "MultiPoint":
      return <MultiPointRipple feature={feature} />;
    case "LineString":
      return <LineRipple feature={feature} />;
    case "MultiLineString":
      return <MultiLineRipple feature={feature} />;
    case "Polygon":
      return <PolygonRipple feature={feature} />;
    case "MultiPolygon":
      return <MultiPolygonRipple feature={feature} />;
    case "GeometryCollection":
      return null;
  }
}
