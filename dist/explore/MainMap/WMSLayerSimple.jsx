import { useMemo } from "react";
import { Layer, Source } from "react-map-gl/maplibre";
import { TILE_SIZE } from "../../config";
import { makeWMSUrl } from "../../utils/geoserver";
export function WMSLayerSimple({ layer, prevLayer }) {
  var _a;
  const tiles = useMemo(() => {
    const params = {
      layers: [layer.data.layer_id],
      __style_version__: layer.version,
    };
    return [makeWMSUrl(params)];
  }, [layer.version]);
  return (
    <Source
      id={layer.data.layer_id}
      type="raster"
      tiles={tiles}
      tileSize={TILE_SIZE}
    >
      <Layer
        id={layer.data.layer_id}
        beforeId={
          (_a =
            prevLayer === null || prevLayer === void 0
              ? void 0
              : prevLayer.data.layer_id) !== null && _a !== void 0
            ? _a
            : ""
        }
        type="raster"
        layout={{
          visibility: layer.visible ? "visible" : "none",
        }}
        paint={{
          "raster-opacity": layer.style.layerOpacity,
        }}
      />
    </Source>
  );
}
