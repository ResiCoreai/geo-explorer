import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ColorLensOutlined, ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, MenuItem, Select, Stack, Typography, } from '@mui/material';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useOGCClient } from '../../../hooks/useOGCClient';
import { useDispatch } from '../../../store';
import { setLayerStyleName, setShowStyleSettings, } from '../../../store/explore/slice';
export function StyleEditor({ layer }) {
    const dispatch = useDispatch();
    const [styleOptions, setStyleOptions] = useState([]);
    const ogcClient = useOGCClient();
    useEffect(() => {
        ogcClient === null || ogcClient === void 0 ? void 0 : ogcClient.getStyleNames(layer.data).then(setStyleOptions);
    }, [layer]);
    return (_jsxs(Stack, { direction: "column", className: "h-full bg-white border border-[#0000001F]", children: [_jsxs(Stack, { direction: "row", className: "h-[44px] px-[16px] py-[12px] items-center gap-[5px]", children: [_jsx(ColorLensOutlined, {}), _jsx(Typography, { className: "font-sans text-[14px] uppercase", children: "Appearance Settings" })] }), _jsxs(Stack, { className: "flex-1 py-[10px]", children: [_jsx(Box, { className: "flex-1 overflow-y-scroll", children: _jsxs(Accordion, { elevation: 0, defaultExpanded: true, children: [_jsx(AccordionSummary, { expandIcon: _jsx(ExpandMore, {}), children: _jsx(Typography, { className: "font-medium uppercase", children: "General" }) }), _jsxs(AccordionDetails, { className: "px-[16px]", children: [_jsx(Typography, { className: "text-[14px]", children: "Styles" }), _jsx(Select, { className: classNames('mt-[10px] h-[34px] px-4 py-2', 'border border-solid rounded-md shadow-sm border-[#D1D5DB] focus:bg-[#F3F4F6] hover:bg-[#F3F4F6]', 'flex items-center'), value: layer.style_name, onChange: (e) => {
                                                dispatch(setLayerStyleName({
                                                    layer_id: layer.data.layer_id,
                                                    style_name: e.target.value,
                                                }));
                                            }, fullWidth: true, variant: "standard", disableUnderline: true, children: styleOptions.map((option) => (_jsx(MenuItem, { value: option, children: option }, option))) })] })] }) }), _jsx(Button, { className: "mx-[16px]", disableElevation: true, variant: "contained", onClick: () => dispatch(setShowStyleSettings({ show: false })), children: "Done" })] })] }));
}
//# sourceMappingURL=index.js.map