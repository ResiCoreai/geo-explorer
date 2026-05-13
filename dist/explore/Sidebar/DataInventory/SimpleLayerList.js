import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import { Box, InputAdornment, MenuItem, Select } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { layerTypeIcons } from '../../../explore/Sidebar/utils/icons';
import { useImplementation } from '../../../hooks/useImplementation';
import { useSelector } from '../../../store';
export function SimpleLayerList() {
    const { SimpleLayerItem } = useImplementation();
    const datasets = useSelector((state) => state.explore.simpleLayerInventory);
    const groupByOptions = useMemo(() => {
        return Array.from(new Set(datasets.flatMap((dataset) => Object.keys(dataset.labels))));
    }, [datasets]);
    const [groupBy, setGroupBy] = useState('');
    useEffect(() => {
        if (!groupBy && groupByOptions[0]) {
            setGroupBy(groupByOptions[0]);
        }
    }, [groupByOptions]);
    const datasetGroups = useMemo(() => {
        var _a;
        const groups = {};
        for (const dataset of datasets) {
            const groupKey = (_a = dataset.labels[groupBy]) !== null && _a !== void 0 ? _a : '';
            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }
            groups[groupKey].push(dataset);
        }
        return groups;
    }, [datasets, groupBy]);
    return (_jsxs(_Fragment, { children: [_jsx(Box, { mt: 2, className: "flex-none px-[32px]", children: _jsx(Select, { value: groupBy, onChange: (e) => setGroupBy(e.target.value), fullWidth: true, variant: "standard", disableUnderline: true, className: "capitalize bg-[#F3F4F6] text-[14px] h-[34px] px-4 py-2 rounded-sm shadow-sm focus:bg-[#F3F4F6] hover:bg-[#F3F4F6] flex items-center", startAdornment: _jsx(InputAdornment, { className: "text-gray-600 text-[14px]", position: "start", children: _jsx(FolderOpenOutlinedIcon, {}) }), children: groupByOptions.map((option) => (_jsx(MenuItem, { value: option, className: "capitalize", children: option.replace(/_/g, ' ') }, option))) }) }), _jsx(Box, { className: "flex-auto overflow-scroll no-scrollbar", children: Object.entries(datasetGroups).map(([groupKey, datasets]) => {
                    var _a;
                    return (_jsxs(Box, { className: "my-[20px]", children: [_jsxs(Box, { className: "flex flex-row items-center gap-[6px] text-[#13294B99] text-[11px] px-[32px] capitalize font-bold", children: [groupBy === 'feature_type' &&
                                        ((_a = layerTypeIcons[groupKey]) === null || _a === void 0 ? void 0 : _a.call(layerTypeIcons, {
                                            className: 'w-5 h-5',
                                        })), groupKey] }), _jsx(Box, { className: "mt-[5px]", children: datasets.length > 0 ? (datasets.map((dataset) => (_jsx(Box, { className: "flex justify-center px-[32px]", children: _jsx(SimpleLayerItem, { dataset: dataset }) }, dataset.layer_id)))) : (_jsx(Box, { className: "text-gray-400 text-sm italic px-[32px]", children: "Datasets will be available soon..." })) })] }, groupKey));
                }) })] }));
}
//# sourceMappingURL=SimpleLayerList.js.map