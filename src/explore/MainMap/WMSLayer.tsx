import { useContext } from 'react';

import { GeoExplorerContext } from '@ncsa/geo-explorer/GeoExplorerProvider';
import { MapLayer } from '@ncsa/geo-explorer/store/explore/types';

export type WMSLayerProps = {
  layer: MapLayer;
  prevLayer: MapLayer | null;
};

export function WMSLayer({ layer, prevLayer }: WMSLayerProps) {
  const { WMSLayerSimple, WMSLayerTemporal } =
    useContext(GeoExplorerContext).components;
  return layer.data.dataset_info.dataset_type === 'raster' &&
    layer.data.dataset_info.timestamps.length > 0 ? (
    <WMSLayerTemporal layer={layer} prevLayer={prevLayer} />
  ) : (
    <WMSLayerSimple layer={layer} prevLayer={prevLayer} />
  );
}
