import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BaseMaps } from "../../explore/Sidebar/BaseMaps";
import { DataInventory } from "../../explore/Sidebar/DataInventory";
import { MapLayers } from "../../explore/Sidebar/MapLayers";
export function Sidebar() {
  return _jsx("div", {
    className: "w-full h-full relative",
    children: _jsxs("div", {
      className: "bg-white h-full flex flex-col",
      children: [
        _jsxs("div", {
          className: "flex-1 min-h-0 flex flex-col",
          children: [_jsx(DataInventory, {}), _jsx(MapLayers, {})],
        }),
        _jsx(BaseMaps, {}),
      ],
    }),
  });
}
