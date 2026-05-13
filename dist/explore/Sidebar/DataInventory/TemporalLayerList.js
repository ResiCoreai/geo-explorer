import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import { Box, InputAdornment, MenuItem, Select } from '@mui/material';
import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { useImplementation } from '../../../hooks/useImplementation';
import { useSelector } from '../../../store';
export function TemporalLayerList() {
    const { TemporalLayerItem } = useImplementation();
    const datasets = useSelector((state) => state.explore.temporalLayerInventory);
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
    const [expandedSections, setExpandedSections] = useState({});
    const toggleSection = (type) => {
        setExpandedSections((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };
    return (_jsxs(_Fragment, { children: [_jsx(Box, { mt: 2, className: "flex-none px-[32px]", children: _jsx(Select, { value: groupBy, onChange: (e) => setGroupBy(e.target.value), fullWidth: true, variant: "standard", disableUnderline: true, className: "capitalize bg-[#F3F4F6] text-[14px] h-[34px] px-4 py-2 rounded-sm shadow-sm focus:bg-[#F3F4F6] hover:bg-[#F3F4F6] flex items-center", startAdornment: _jsx(InputAdornment, { className: "text-gray-600 text-[14px]", position: "start", children: _jsx(FolderOpenOutlinedIcon, {}) }), children: groupByOptions.map((option) => (_jsx(MenuItem, { value: option, sx: { textTransform: 'capitalize' }, children: option.replace(/_/g, ' ') }, option))) }) }), _jsxs(Box, { className: "flex-auto overflow-scroll no-scrollbar", children: [_jsx(Box, { className: "flex justify-between text-[12px] text-[#13294B99] px-[32px] mt-4", children: _jsxs("span", { children: [Object.keys(datasetGroups).length, " groups"] }) }), Object.entries(datasetGroups).map(([groupKey, datasets]) => {
                        const isExpanded = expandedSections[groupKey];
                        return (_jsxs(Box, { className: "flex-auto overflow-scroll no-scrollbar px-[32px] my-2", children: [_jsx(Box, { className: classNames('flex items-center justify-between px-2 py-2 cursor-pointer transition-colors', {
                                        'bg-[#F3F4F6] rounded-sm': isExpanded,
                                        'bg-white rounded-md border border-solid border-[#D1D5DB] hover:border-[#13294B] hover:text-[#13294B]': !isExpanded,
                                    }), onClick: () => toggleSection(groupKey), children: _jsxs(Box, { className: "flex items-start overflow-hidden", children: [_jsx(NavigateNextOutlinedIcon, { className: classNames('w-5 h-5 text-[#2C343C] transition-transform', {
                                                    'rotate-90': isExpanded,
                                                }) }), _jsx(Box, { className: "flex flex-col text-left", children: _jsx("span", { className: classNames('text-sm text-[#2C343C] capitalize', {
                                                        'font-semibold': isExpanded,
                                                        'font-normal': !isExpanded,
                                                    }), children: groupKey }) })] }) }), isExpanded && (_jsx(Box, { className: "flex flex-col px-4 bg-[#F3F4F6] rounded-sm", children: datasets.length > 0 ? (datasets.map((dataset) => (_jsx(TemporalLayerItem, { dataset: dataset }, dataset.layer_id)))) : (_jsx(Box, { className: "text-gray-400 text-sm italic", children: "Datasets will be available soon..." })) }))] }, groupKey));
                    })] })] }));
}
//# sourceMappingURL=TemporalLayerList.js.map