import { jsx as _jsx } from "react/jsx-runtime";
import { useImplementation } from '../../hooks/useImplementation';
export function WMSLayer({ layer, prevLayer }) {
    const { WMSLayerSimple, WMSLayerTemporal } = useImplementation();
    return layer.data.layer_type === 'raster' &&
        layer.data.timestamps.length > 0 ? (_jsx(WMSLayerTemporal, { layer: layer, prevLayer: prevLayer })) : (_jsx(WMSLayerSimple, { layer: layer, prevLayer: prevLayer }));
}
//# sourceMappingURL=WMSLayer.js.map