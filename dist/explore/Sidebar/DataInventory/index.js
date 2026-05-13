import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FilterAltOutlined, Search } from '@mui/icons-material';
import { Box, IconButton, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { useImplementation } from '../../../hooks/useImplementation';
import { DatabaseHeavy } from '../../../icons/DatabaseHeavy';
export function DataInventory() {
    const { SimpleLayerList, TemporalLayerList, SidebarSection } = useImplementation();
    const [tabIndex, setTabIndex] = useState(0);
    return (_jsx(SidebarSection, { icon: _jsx(DatabaseHeavy, { size: 16 }), weight: 2, title: "Data Inventory", extras: _jsxs(Box, { className: "flex flex-row gap-[6px]", children: [_jsx(IconButton, { size: "small", onClick: (e) => e.stopPropagation(), children: _jsx(Search, { className: "text-[#0000008A]" }) }), _jsx(IconButton, { size: "small", onClick: (e) => e.stopPropagation(), children: _jsx(FilterAltOutlined, { className: "text-[#0000008A]" }) })] }), initialExpanded: true, children: _jsxs(Box, { className: "flex flex-col h-full", children: [_jsx(Box, { className: "flex-none px-[32px]", children: _jsxs(Tabs, { centered: true, className: "w-full", value: tabIndex, onChange: (_, newValue) => setTabIndex(newValue), children: [_jsx(Tab, { label: "Vector Datasets", className: "flex-1 min-w-0 capitalize" }), _jsx(Tab, { label: "Raster Datasets", className: "flex-1 min-w-0 capitalize" })] }) }), tabIndex === 0 && _jsx(SimpleLayerList, {}), tabIndex === 1 && _jsx(TemporalLayerList, {})] }) }));
}
//# sourceMappingURL=index.js.map