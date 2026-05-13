import { jsx as _jsx } from "react/jsx-runtime";
import Box from '@mui/material/Box';
import { useContext, useEffect, useMemo, useState } from 'react';
import { GeoExplorerContext } from '../../../../GeoExplorerProvider';
export function RasterLegendIcon({ layer }) {
    const { ogcClient } = useContext(GeoExplorerContext);
    const [legend, setLegend] = useState(null);
    useEffect(() => {
        ogcClient === null || ogcClient === void 0 ? void 0 : ogcClient.getLegendJSON(layer.data).then(setLegend);
    }, [ogcClient]);
    const colorMap = useMemo(() => {
        var _a, _b, _c, _d, _e;
        return ((_e = (_d = (_c = (_b = (_a = legend === null || legend === void 0 ? void 0 : legend.Legend) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.rules[0]) === null || _c === void 0 ? void 0 : _c.symbolizers[0]) === null || _d === void 0 ? void 0 : _d.Raster.colormap.entries) !== null && _e !== void 0 ? _e : []);
    }, [legend]);
    const gradient = useMemo(() => {
        if (!colorMap.length)
            return '';
        return `linear-gradient(180deg, ${colorMap.map((e) => e.color).join(', ')})`;
    }, [colorMap]);
    return (_jsx(Box, { className: "border border-black rounded-sm shadow-sm w-[18px] h-[18px] border-solid", sx: {
            background: gradient,
        } }));
}
//# sourceMappingURL=RasterLegendIcon.js.map