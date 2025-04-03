import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Divider, Stack, Typography } from '@mui/material';
export function ClimateLayerSummary({ layer }) {
    const timestamp = layer.data.dataset_info.timestamps[layer.timestampIdx];
    return (_jsxs(Box, { className: "pb-[10px]", children: [_jsx(Divider, {}), _jsxs(Stack, { direction: "row", className: "my-[6px]", children: [_jsxs(Typography, { className: "text-[12px] text-[#2C343CCC]", children: ["Scenario:", ' '] }), _jsx(Box, { className: "flex-1" }), _jsx(Typography, { className: "text-[12px] text-[#0455A4] font-semibold", children: layer.data.dataset_info.climate_scenario })] }), timestamp && (_jsxs(Stack, { direction: "row", className: "my-[6px] text-[#2C343CCC]", children: [_jsxs(Typography, { className: "text-[12px] text-[#2C343CCC]", children: ["Timestamp:", ' '] }), _jsx(Box, { className: "flex-1" }), _jsxs(Typography, { className: "text-[12px] font-semibold", children: [new Date(timestamp).getUTCFullYear(), " Q", Math.floor(new Date(timestamp).getUTCMonth() / 3) + 1] })] }))] }));
}
