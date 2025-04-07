import { jsx as _jsx } from 'react/jsx-runtime';

import { WMSLayerSimple } from '../../explore/MainMap/WMSLayerSimple';
import { WMSLayerTemporal } from '../../explore/MainMap/WMSLayerTemporal';

export function WMSLayer({ layer, prevLayer }) {
  return layer.data.dataset_info.dataset_type === 'raster' &&
    layer.data.dataset_info.timestamps.length > 0
    ? _jsx(WMSLayerTemporal, { layer: layer, prevLayer: prevLayer })
    : _jsx(WMSLayerSimple, { layer: layer, prevLayer: prevLayer });
}
