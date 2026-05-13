import { jsx as _jsx } from "react/jsx-runtime";
import { RasterLegendIcon } from './RasterLegendIcon';
import { VectorLegendIcon } from './VectorLegendIcon';
export function LegendIcon({ layer }) {
    switch (layer.data.layer_type) {
        case 'point':
        case 'line':
        case 'polygon':
            return _jsx(VectorLegendIcon, { layer: layer });
        case 'raster':
            return _jsx(RasterLegendIcon, { layer: layer });
    }
}
//# sourceMappingURL=index.js.map