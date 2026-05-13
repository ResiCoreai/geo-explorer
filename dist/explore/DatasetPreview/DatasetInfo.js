import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Divider, Typography } from '@mui/material';
import { layerTypeIcons } from '../../explore/Sidebar/utils/icons';
import { useSelector } from '../../store';
export const DatasetInfo = () => {
    var _a;
    const dataset = useSelector((state) => state.explore.simpleLayerInventory.find((dataset) => dataset.layer_id === state.explore.selectedDataset) ||
        state.explore.temporalLayerInventory.find((dataset) => dataset.layer_id === state.explore.selectedDataset));
    if (!dataset)
        return null;
    return (_jsx(Box, { className: "p-4", children: _jsxs(Box, { className: "flex flex-col md:flex-row", children: [_jsxs(Box, { className: "flex-1 pr-0 md:pr-4", children: [_jsx(Typography, { className: "text-[16px] font-semibold", children: "Description" }), _jsx(Box, { className: "mt-2", children: _jsx(Typography, { variant: "body2", className: "text-gray-600", children: dataset.description }) })] }), _jsx(Divider, { orientation: "vertical", flexItem: true, className: "my-4 md:my-0" }), _jsxs(Box, { className: "flex-1 pl-0 md:pl-4", children: [_jsx(Typography, { className: "text-[16px] font-semibold", children: "Attributes" }), _jsxs(Box, { className: "mt-2 flex justify-between items-center", children: [_jsx(Typography, { variant: "body2", color: "gray", children: "Dataset Category" }), _jsx(Typography, { className: "text-right capitalize", children: dataset.labels.dataset_category })] }), _jsxs(Box, { className: "mt-2 flex justify-between items-center", children: [_jsx(Typography, { variant: "body2", color: "gray", children: "Layer Type" }), _jsx(Box, { className: "flex items-center", children: _jsxs(Box, { className: "flex items-center", children: [(_a = layerTypeIcons[dataset.layer_type]) === null || _a === void 0 ? void 0 : _a.call(layerTypeIcons, {
                                                className: 'text-red-500',
                                            }), _jsx(Typography, { className: "ml-2 capitalize", children: dataset.layer_type })] }) })] }), _jsxs(Box, { className: "mt-2 flex justify-between items-center", children: [_jsx(Typography, { variant: "body2", color: "gray", children: "Data Source" }), _jsx(Typography, { className: "text-right capitalize", children: "N/A" })] })] })] }) }));
};
//# sourceMappingURL=DatasetInfo.js.map