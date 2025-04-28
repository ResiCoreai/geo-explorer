import { WMSLayerSimple } from '@ncsa/geo-explorer/explore/MainMap/WMSLayerSimple';
import { WMSLayerTemporal } from '@ncsa/geo-explorer/explore/MainMap/WMSLayerTemporal';
import { MapLayer } from '@ncsa/geo-explorer/store/explore/types';

export type WMSLayerProps = {
  layer: MapLayer;
  prevLayer: MapLayer | null;
};

export function WMSLayer({ layer, prevLayer }: WMSLayerProps) {
  return layer.data.dataset_info.dataset_type === 'raster' &&
    layer.data.dataset_info.timestamps.length > 0 ? (
    <WMSLayerTemporal layer={layer} prevLayer={prevLayer} />
  ) : (
    <WMSLayerSimple layer={layer} prevLayer={prevLayer} />
  );
}
