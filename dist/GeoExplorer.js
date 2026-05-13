import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton, Stack } from '@mui/material';
import { SIDEBAR_WIDTH } from './config';
import { MainMap } from './explore/MainMap';
import { LegendPanel } from './explore/MainMap/LegendPanel';
import { useImplementation } from './hooks/useImplementation';
import { useDispatch, useSelector, } from './store';
import { setSidebarOpen } from './store/explore/slice';
import 'maplibre-gl/dist/maplibre-gl.css';
export function GeoExplorer() {
    const { DatasetPreview, MapLayerSettings, Sidebar } = useImplementation();
    const dispatch = useDispatch();
    const mapLayers = useSelector((state) => state.explore.mapLayers);
    const selectedLayer = useSelector((state) => state.explore.mapLayers.find((layer) => layer.data.layer_id === state.explore.selectedLayer));
    const sidebarOpen = useSelector((state) => state.explore.sidebarOpen);
    return (_jsxs(Box, { className: "w-full h-full relative overflow-hidden", children: [_jsx(MainMap, {}), _jsxs(Stack, { direction: "row", className: "absolute left-0 right-0 top-0 bottom-0 min-h-0 pointer-events-none transition-all", style: {
                    marginLeft: sidebarOpen ? 0 : -SIDEBAR_WIDTH,
                }, children: [_jsxs(Box, { style: { width: SIDEBAR_WIDTH }, className: "flex-none h-full relative z-[1] pointer-events-auto", children: [_jsxs(IconButton, { className: sidebarOpen
                                    ? 'absolute -right-[15px] top-2 z-10 bg-white'
                                    : 'absolute -right-[40px] top-2 z-10 bg-white', onClick: () => {
                                    dispatch(setSidebarOpen({ open: !sidebarOpen }));
                                }, size: "small", children: [sidebarOpen ? (_jsx(ChevronLeftIcon, { className: "text-[#0000008A] text-[large]" })) : (_jsx(ChevronRightIcon, { className: "text-[#0000008A] text-[large]" })), ' '] }), _jsx(Sidebar, {})] }), _jsx(Box, { className: "flex-1 relative", children: _jsxs(Box, { className: "absolute bottom-0 left-0 right-0", children: [selectedLayer && (_jsx(Stack, { direction: "row", className: "justify-end m-2", children: _jsx(Box, { className: "pointer-events-auto", children: _jsx(LegendPanel, { layers: mapLayers, selectedLayer: selectedLayer }) }) })), _jsx(Box, { className: "pointer-events-auto ", children: _jsx(MapLayerSettings, {}) })] }) })] }), _jsx(DatasetPreview, {})] }));
}
//# sourceMappingURL=GeoExplorer.js.map