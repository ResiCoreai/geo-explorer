import { useContext, useMemo } from 'react';
import { Layer, Source } from 'react-map-gl/maplibre';

import { GeoExplorerContext } from '@ncsa/geo-explorer/GeoExplorerProvider';
import { TILE_SIZE } from '@ncsa/geo-explorer/config';
import { MapLayer } from '@ncsa/geo-explorer/store/explore/types';
import { Params } from '@ncsa/geo-explorer/utils/ogcClient';

export type WMSLayerSimpleProps = {
  layer: MapLayer;
  prevLayer: MapLayer | null;
};

export function WMSLayerSimple({ layer, prevLayer }: WMSLayerSimpleProps) {
  const { ogcClient } = useContext(GeoExplorerContext);

  const tiles = useMemo(() => {
    const params: Params = {
      layers: [layer.data.layer_id],
      __style_version__: layer.version,
    };
    return ogcClient
      ? [ogcClient.makeWMSUrl(layer.data.ogc_service_url, params)]
      : [];
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
        beforeId={prevLayer?.data.layer_id ?? ''}
        type="raster"
        layout={{
          visibility: layer.visible ? 'visible' : 'none',
        }}
        paint={{
          'raster-opacity': layer.style.layerOpacity,
        }}
      />
    </Source>
  );
}
