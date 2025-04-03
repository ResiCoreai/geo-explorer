import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import { Box, Link } from '@mui/material';
import classNames from 'classnames';
import { useState } from 'react';
import { CLIMATE_MODEL_INFO_URL } from '../../../config';
import { climateScenarioIcons, climateVariableIcons, typeDescription, } from '../../../explore/Sidebar/utils/icons';
import { ClimateItem } from './ClimateItem';
export function ClimateList({ climateDatasets, climateSelectedOption }) {
    const iconList = climateSelectedOption === 'climate_variable'
        ? climateVariableIcons
        : climateScenarioIcons;
    const [expandedSections, setExpandedSections] = useState({});
    const toggleSection = (type) => {
        setExpandedSections((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };
    return (_jsxs(Box, { className: "flex-auto overflow-scroll no-scrollbar", children: [_jsxs(Box, { className: "flex justify-between text-[12px] text-[#13294B99] px-[32px] mt-4", children: [_jsx("span", { children: climateSelectedOption === 'climate_scenario'
                            ? '5 scenario project'
                            : '9 variables' }), _jsxs("span", { children: ["Source: \u00A0", _jsx(Link, { href: CLIMATE_MODEL_INFO_URL, target: "_blank", className: "text-[#6B7280] decoration-[#6B7280]", children: "NCCS" })] })] }), iconList.map(({ type, icon }) => {
                var _a, _b, _c, _d;
                const filteredDatasets = climateDatasets.filter((layer) => layer.dataset_info[climateSelectedOption] === type);
                const isExpanded = expandedSections[type];
                return (_jsxs(Box, { className: "flex-auto overflow-scroll no-scrollbar px-[32px] my-2", children: [_jsx(Box, { className: classNames('flex items-center justify-between px-2 py-2 cursor-pointer transition-colors', {
                                'bg-[#F3F4F6] rounded-sm': isExpanded,
                                'bg-white rounded-md border border-solid border-[#D1D5DB] hover:border-[#13294B] hover:text-[#13294B]': !isExpanded,
                            }), onClick: () => toggleSection(type), children: _jsxs(Box, { className: "flex items-start overflow-hidden", children: [_jsx(NavigateNextOutlinedIcon, { className: classNames('w-5 h-5 text-[#2C343C] transition-transform', {
                                            'rotate-90': isExpanded,
                                        }) }), climateSelectedOption === 'climate_variable' && (_jsx("div", { className: "mt-0.5 mr-1", children: icon({ className: 'w-4 h-4' }) })), _jsxs(Box, { className: "flex flex-col text-left", children: [_jsx("span", { className: classNames('text-sm text-[#2C343C]', {
                                                    'font-semibold': isExpanded,
                                                    'font-normal': !isExpanded,
                                                }), children: (_b = (_a = typeDescription[type]) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : type }), climateSelectedOption === 'climate_variable' && (_jsx("span", { className: "italic text-[11px] capitalize text-[#13294B8A]", children: (_d = (_c = typeDescription[type]) === null || _c === void 0 ? void 0 : _c.units) !== null && _d !== void 0 ? _d : '' }))] })] }) }), isExpanded && (_jsx(Box, { className: "flex flex-col px-4 bg-[#F3F4F6] rounded-sm", children: filteredDatasets.length > 0 ? (filteredDatasets.map((climateDataset) => (_jsx(ClimateItem, { dataset: climateDataset, climateSelectedOption: climateSelectedOption }, climateDataset.layer_id)))) : (_jsx(Box, { className: "text-gray-400 text-sm italic", children: "Datasets will be available soon..." })) }))] }, type));
            })] }));
}
