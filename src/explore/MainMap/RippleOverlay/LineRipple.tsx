import { Feature, LineString } from "geojson";
import { Point } from "maplibre-gl";
import { useEffect, useState } from "react";
import { useMap } from "react-map-gl/maplibre";

import {
  DURATION,
  RADIUS_MAX,
  RADIUS_MIN,
  RIPPLE_COLOR,
  RIPPLE_WIDTH,
} from "@ncsa/geo-explorer/explore/MainMap/RippleOverlay/constants";

type Props = {
  feature: Feature<LineString>;
};

export function LineRipple({ feature }: Props) {
  const { current: map } = useMap();

  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    if (!map) return;
    const update = () => {
      setPoints(
        feature.geometry.coordinates?.map(([lon, lat]) =>
          map.project([lon ?? 0, lat ?? 0]),
        ) ?? [],
      );
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

  return (
    <>
      <defs>
        <filter id={filterId} x="-100%" y="-100%" width="400%" height="400%">
          <feMorphology
            id={`${filterId}_outer`}
            in="SourceAlpha"
            operator="dilate"
            radius="0"
            result="outer"
          />
          <feMorphology
            id={`${filterId}_inner`}
            in="SourceAlpha"
            operator="dilate"
            radius="0"
            result="inner"
          />
          <feComposite
            in="outer"
            in2="inner"
            operator="out"
            result="rippleAlpha"
          />
          <feFlood
            id={`${filterId}_color`}
            floodColor={RIPPLE_COLOR}
            floodOpacity="1"
            result="ripple-color"
          />
          <feComposite
            in="ripple-color"
            in2="rippleAlpha"
            operator="in"
            result="ripple"
          />
          <feMerge>
            <feMergeNode in="ripple" />
          </feMerge>
        </filter>
      </defs>
      <polyline
        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
        stroke="black"
        fill="none"
        filter={`url(#${filterId})`}
      />
      <animate
        xlinkHref={`#${filterId}_outer`}
        attributeName="radius"
        from={RADIUS_MIN + RIPPLE_WIDTH}
        to={RADIUS_MAX + RIPPLE_WIDTH}
        dur={DURATION}
        begin="0s"
        repeatCount="indefinite"
      />
      <animate
        xlinkHref={`#${filterId}_inner`}
        attributeName="radius"
        from={RADIUS_MIN}
        to={RADIUS_MAX}
        dur={DURATION}
        begin="0s"
        repeatCount="indefinite"
      />
      <animate
        xlinkHref={`#${filterId}_color`}
        attributeName="flood-opacity"
        from={1}
        to={0}
        dur={DURATION}
        begin="0s"
        repeatCount="indefinite"
      />
    </>
  );
}
