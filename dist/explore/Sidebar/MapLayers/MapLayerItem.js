import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowDownwardOutlined, ArrowUpwardOutlined, ColorLensOutlined, } from '@mui/icons-material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Stack, Typography, } from '@mui/material';
import classNames from 'classnames';
import { useCallback, useRef, useState } from 'react';
import { useImplementation } from '../../../hooks/useImplementation';
import { LayerControlIcon } from '../../../icons/LayerControl';
import { useDispatch, useSelector, } from '../../../store';
import { moveLayer, removeLayer, reorderEnd, reorderStart, selectMapLayer, setCurrentIndex, setShowLayerSettings, setShowStyleSettings, toggleVisibility, } from '../../../store/explore/slice';
export function MapLayerItem({ index, layer }) {
    const { LegendIcon, TemporalLayerSummary } = useImplementation();
    const dispatch = useDispatch();
    const mapLayers = useSelector((state) => state.explore.mapLayers);
    const selectedLayer = useSelector((state) => state.explore.mapLayers.find((layer) => layer.data.layer_id === state.explore.selectedLayer));
    const reordering = useSelector((state) => state.explore.prevIndex !== -1);
    const elRef = useRef(null);
    const initialPointRef = useRef([-1, -1]);
    const onMouseUpGlobal = useCallback(() => {
        if (!elRef.current)
            return;
        dispatch(reorderEnd());
        elRef.current.style.transform = '';
        elRef.current.style.zIndex = '';
        elRef.current.style.pointerEvents = '';
        window.removeEventListener('mousemove', onMouseMoveGlobal);
        window.removeEventListener('mouseup', onMouseUpGlobal);
    }, []);
    const onMouseMoveGlobal = useCallback((e) => {
        if (!elRef.current)
            return;
        const [initialX, initialY] = initialPointRef.current;
        elRef.current.style.transform = `translate(${e.clientX - initialX}px, ${e.clientY - initialY}px)`;
    }, []);
    const onDragStart = useCallback((e) => {
        if (!elRef.current)
            return;
        initialPointRef.current = [e.clientX, e.clientY];
        elRef.current.style.zIndex = '1';
        elRef.current.style.pointerEvents = 'none';
        dispatch(reorderStart({ index }));
        window.addEventListener('mousemove', onMouseMoveGlobal);
        window.addEventListener('mouseup', onMouseUpGlobal);
    }, [index]);
    const onDragOver = useCallback((e) => {
        if (!elRef.current)
            return;
        if (reordering) {
            const rect = elRef.current.getBoundingClientRect();
            dispatch(setCurrentIndex({
                index: e.clientY < rect.top + rect.height / 2 ? index : index + 1,
            }));
        }
    }, [index, reordering]);
    const selected = (selectedLayer === null || selectedLayer === void 0 ? void 0 : selectedLayer.data.layer_id) === layer.data.layer_id;
    const toggleSelectedLayer = useCallback(() => {
        dispatch(selectMapLayer({
            layer_id: selected ? null : layer.data.layer_id,
        }));
    }, [selected, layer]);
    const [menuOpen, setMenuOpen] = useState(false);
    const anchorElRef = useRef(null);
    return (_jsxs(Box, { ref: elRef, className: classNames('px-[16px] relative text-[#13294B] hover:bg-[#1976D214] hover:border-[#1976D2] transition-colors cursor-pointer select-none font-semibold rounded-md', selected
            ? 'border-0 border-l-[2px] border-solid border-[#0066FF] bg-[#F1F6FF] shadow-[0px_4px_4px_0px_#00000040]'
            : 'border border-solid border-[#D1D5DB] bg-white'), onMouseMove: onDragOver, onClick: toggleSelectedLayer, children: [_jsxs(Stack, { direction: "row", className: "items-center gap-[2px]", children: [_jsx(Stack, { className: "cursor-move flex-none items-center justify-center", onMouseDown: onDragStart, children: _jsx(LayerControlIcon, {}) }), _jsx(Stack, { className: "items-center justify-center mx-[6px]", children: _jsx(LegendIcon, { layer: layer }) }), _jsx(Typography, { className: "flex-auto min-w-0 whitespace-nowrap overflow-hidden text-ellipsis text-[14px] font-semibold", children: layer.data.display_name }), _jsxs(Stack, { direction: "row", onClick: (e) => {
                            e.stopPropagation();
                        }, children: [_jsx(IconButton, { size: "small", className: "flex-none text-[#13294B]", onClick: () => {
                                    dispatch(toggleVisibility({ layer_id: layer.data.layer_id }));
                                }, children: layer.visible ? (_jsx(VisibilityOutlinedIcon, { className: "fill-[#13294B8C]" })) : (_jsx(VisibilityOffOutlinedIcon, { className: "fill-[#13294B8C]" })) }), _jsx(IconButton, { size: "small", className: "flex-none text-[#13294B]", ref: anchorElRef, onClick: () => setMenuOpen(true), children: _jsx(MoreHorizOutlinedIcon, { className: "fill-[#13294B8C]" }) })] })] }), selected && layer.data.timestamps.length > 0 && (_jsx(TemporalLayerSummary, { layer: layer })), _jsxs(Menu, { anchorEl: anchorElRef.current, open: menuOpen, onClose: () => setMenuOpen(false), onClick: (e) => {
                    e.stopPropagation();
                    setMenuOpen(false);
                }, children: [_jsxs(MenuItem, { onClick: () => {
                            dispatch(selectMapLayer({ layer_id: layer.data.layer_id }));
                            dispatch(setShowStyleSettings({ show: true }));
                        }, children: [_jsx(ListItemIcon, { children: _jsx(ColorLensOutlined, {}) }), "More style settings"] }), _jsx(Divider, {}), _jsxs(MenuItem, { onClick: () => {
                            dispatch(selectMapLayer({ layer_id: layer.data.layer_id }));
                            dispatch(setShowLayerSettings({ show: true }));
                        }, children: [_jsx(ListItemIcon, { children: _jsx(TableChartOutlinedIcon, {}) }), "View data table"] }), _jsx(Divider, {}), _jsxs(MenuItem, { disabled: index === 0, onClick: () => {
                            dispatch(moveLayer({ fromIndex: index, toIndex: index - 1 }));
                        }, children: [_jsx(ListItemIcon, { children: _jsx(ArrowUpwardOutlined, {}) }), "Move forward"] }), _jsxs(MenuItem, { disabled: index === mapLayers.length - 1, onClick: () => {
                            dispatch(moveLayer({ fromIndex: index, toIndex: index + 2 }));
                        }, children: [_jsx(ListItemIcon, { children: _jsx(ArrowDownwardOutlined, {}) }), "Move backward"] }), _jsx(Divider, {}), _jsx(MenuItem, { className: "text-[#D32F2F]", onClick: () => {
                            dispatch(removeLayer({ layer_id: layer.data.layer_id }));
                        }, children: "Remove from map" })] })] }, layer.data.layer_id));
}
//# sourceMappingURL=MapLayerItem.js.map