import { WMSLayerSimple } from "@ncsa/geo-explorer/explore/MainMap/WMSLayerSimple";
import { WMSLayerTemporal } from "@ncsa/geo-explorer/explore/MainMap/WMSLayerTemporal";
import { MapLayer } from "@ncsa/geo-explorer/store/explore/types";

type Props = {
  layer: MapLayer;
  prevLayer: MapLayer | null;
};

export function WMSLayer({ layer, prevLayer }: Props) {
  return layer.data.dataset_info.dataset_type === "raster" &&
    layer.data.dataset_info.timestamps.length > 0 ? (
    <WMSLayerTemporal layer={layer} prevLayer={prevLayer} />
  ) : (
    <WMSLayerSimple layer={layer} prevLayer={prevLayer} />
  );
}
