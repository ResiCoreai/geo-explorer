import { useMemo } from "react";
import { Layer, Source } from "react-map-gl/maplibre";

import { TILE_SIZE } from "@ncsa/geo-explorer/config";
import { MapLayer } from "@ncsa/geo-explorer/store/explore/types";
import { makeWMSUrl } from "@ncsa/geo-explorer/utils/geoserver";

type Props = {
  layer: MapLayer;
  prevLayer: MapLayer | null;
};

export function WMSLayerSimple({ layer, prevLayer }: Props) {
  const tiles = useMemo(() => {
    const params: Parameters<typeof makeWMSUrl>[0] = {
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
      // bounds={layer.data.bounds}
    >
      <Layer
        id={layer.data.layer_id}
        beforeId={prevLayer?.data.layer_id ?? ""}
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
