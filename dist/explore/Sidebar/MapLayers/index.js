import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import classNames from 'classnames';
import { useImplementation } from '../../../hooks/useImplementation';
import { useSelector } from '../../../store';
export function MapLayers() {
    const { MapLayerItem, SidebarSection } = useImplementation();
    const currentIndex = useSelector((state) => state.explore.currentIndex);
    const selectedLayers = useSelector((state) => state.explore.mapLayers);
    return (_jsx(SidebarSection, { icon: _jsx(LayersOutlinedIcon, { className: "text-[20px]" }), title: "Map layers", children: _jsxs("div", { className: "h-full overflow-scroll no-scrollbar px-[20px]", children: [selectedLayers.map((layer, i) => (_jsxs("div", { className: "relative pt-1", children: [_jsx("div", { className: classNames(`absolute top-0 left-0 w-full h-[4px]`, {
                                'bg-[#1976D2]': currentIndex === i,
                            }) }), _jsx(MapLayerItem, { index: i, layer: layer }, layer.data.layer_id)] }, layer.data.layer_id))), _jsx("div", { className: classNames(`absolute top-0 left-0 w-full h-[4px]`, {
                        'bg-[#1976D2]': currentIndex === selectedLayers.length,
                    }) }, selectedLayers.length)] }) }));
}
//# sourceMappingURL=index.js.map