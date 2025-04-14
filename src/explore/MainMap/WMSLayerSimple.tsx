import { useContext, useMemo } from 'react';
import { Layer, Source } from 'react-map-gl/maplibre';

import { GeoExplorerContext } from '@ncsa/geo-explorer/GeoExplorerProvider';
import { TILE_SIZE } from '@ncsa/geo-explorer/config';
import { MapLayer } from '@ncsa/geo-explorer/store/explore/types';
import { OGCClient } from '@ncsa/geo-explorer/utils/ogcClient';

type Props = {
  layer: MapLayer;
  prevLayer: MapLayer | null;
};

export function WMSLayerSimple({ layer, prevLayer }: Props) {
  const { ogcClient } = useContext(GeoExplorerContext);

  const tiles = useMemo(() => {
    const params: Parameters<OGCClient['makeWMSUrl']>[0] = {
      layers: [layer.data.layer_id],
      __style_version__: layer.version,
    };
    return ogcClient ? [ogcClient.makeWMSUrl(params)] : [];
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
