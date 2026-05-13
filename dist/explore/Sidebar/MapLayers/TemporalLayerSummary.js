import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Divider, Stack, Typography } from '@mui/material';
export function TemporalLayerSummary({ layer }) {
    const timestamp = layer.data.timestamps[layer.timestampIdx];
    return (_jsxs(Box, { className: "pb-[10px]", children: [_jsx(Divider, {}), Object.entries(layer.data.labels).map(([key, value]) => (_jsxs(Stack, { direction: "row", className: "my-[6px]", children: [_jsxs(Typography, { className: "text-[12px] text-[#2C343CCC] capitalize", children: [key.replace(/_/g, ' '), ":", ' '] }), _jsx(Box, { className: "flex-1" }), _jsx(Typography, { className: "text-[12px] text-[#0455A4] font-semibold capitalize", children: value })] }, key))), timestamp && (_jsxs(Stack, { direction: "row", className: "my-[6px] text-[#2C343CCC]", children: [_jsxs(Typography, { className: "text-[12px] text-[#2C343CCC]", children: ["Timestamp:", ' '] }), _jsx(Box, { className: "flex-1" }), _jsxs(Typography, { className: "text-[12px] font-semibold", children: [new Date(timestamp).getUTCFullYear(), " Q", Math.floor(new Date(timestamp).getUTCMonth() / 3) + 1] })] }))] }));
}
//# sourceMappingURL=TemporalLayerSummary.js.map