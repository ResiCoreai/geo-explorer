import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Stack } from '@mui/material';
import classNames from 'classnames';
import { useState } from 'react';
import { useImplementation } from '../../hooks/useImplementation';
import { useDispatch, useSelector, } from '../../store';
import { setLayerSettingsExpanded, toggleLayerSettings, } from '../../store/explore/slice';
export function MapLayerSettings() {
    const { Header, StyleSettings, TimeSelector, WFSFeatureTable } = useImplementation();
    const dispatch = useDispatch();
    const selectedLayer = useSelector((state) => state.explore.mapLayers.find((layer) => layer.data.layer_id === state.explore.selectedLayer));
    const showLayerSettings = useSelector((state) => state.explore.showLayerSettings);
    const expanded = useSelector((state) => state.explore.layerSettingsExpanded);
    const [styleSettingsOpen, setStyleSettingsOpen] = useState(false);
    if (!(selectedLayer && showLayerSettings))
        return null;
    return (_jsxs(_Fragment, { children: [_jsx(Stack, { id: "layer-settings", direction: "column", className: "w-full items-center", children: _jsxs(Stack, { direction: "column", className: classNames('w-full bg-white gap-[16px] px-[32px] py-[16px] box-border'), children: [_jsx(Header, { onOpenStyleSettings: () => setStyleSettingsOpen(true), onClick: () => {
                                dispatch(setLayerSettingsExpanded({ expanded: !expanded }));
                            }, onClose: () => {
                                dispatch(toggleLayerSettings());
                            } }), expanded && (_jsxs(_Fragment, { children: [selectedLayer.data.timestamps.length > 0 && _jsx(TimeSelector, {}), selectedLayer.data.layer_type !== 'raster' ? (_jsx(Box, { className: "cursor-auto h-[300px]", children: _jsx(WFSFeatureTable, { dataset: selectedLayer.data }) })) : null] }))] }) }), _jsx(StyleSettings, { open: styleSettingsOpen, onClose: () => setStyleSettingsOpen(false) })] }));
}
//# sourceMappingURL=index.js.map