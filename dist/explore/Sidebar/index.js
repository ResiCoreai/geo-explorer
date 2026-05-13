import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useImplementation } from '../../hooks/useImplementation';
import { useSelector } from '../../store';
export function Sidebar() {
    const { BaseMaps, DataInventory, MapLayers, StyleEditor } = useImplementation();
    const selectedLayer = useSelector((state) => state.explore.mapLayers.find((layer) => layer.data.layer_id === state.explore.selectedLayer));
    const showStyleSettings = useSelector((state) => state.explore.showStyleSettings);
    return (_jsxs("div", { className: "w-full h-full relative", children: [_jsxs("div", { className: "bg-white h-full flex flex-col", children: [_jsxs("div", { className: "flex-1 min-h-0 flex flex-col", children: [_jsx(DataInventory, {}), _jsx(MapLayers, {})] }), _jsx(BaseMaps, {})] }), selectedLayer && showStyleSettings && (_jsx("div", { className: "h-full w-[280px] absolute left-full top-0", children: _jsx(StyleEditor, { layer: selectedLayer }) }))] }));
}
//# sourceMappingURL=index.js.map