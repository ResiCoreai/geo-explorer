import { jsx as _jsx } from "react/jsx-runtime";
import Box from "@mui/material/Box";
import { useEffect, useMemo, useState } from "react";
import { getLegendJSON } from "../../../utils/geoserver";
export function CategoricalLegendIcon({ layer }) {
  const [legend, setLegend] = useState(null);
  useEffect(() => {
    getLegendJSON(layer.data.layer_id).then(setLegend);
  }, []);
  const colorMap = useMemo(() => {
    var _a, _b, _c;
    const rules =
      (_c =
        (_b =
          (_a =
            legend === null || legend === void 0 ? void 0 : legend.Legend) ===
            null || _a === void 0
            ? void 0
            : _a[0]) === null || _b === void 0
          ? void 0
          : _b.rules) !== null && _c !== void 0
        ? _c
        : [];
    const entries = [];
    rules.forEach((rule) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const symbolizer =
        (_a = rule.symbolizers) === null || _a === void 0 ? void 0 : _a[0];
      // Point-based symbolizer
      if ("Point" in symbolizer) {
        const graphics =
          (_c =
            (_b =
              symbolizer === null || symbolizer === void 0
                ? void 0
                : symbolizer.Point) === null || _b === void 0
              ? void 0
              : _b.graphics) !== null && _c !== void 0
            ? _c
            : [];
        const fill =
          (_d = graphics[0]) === null || _d === void 0 ? void 0 : _d.fill;
        if (fill) {
          entries.push({
            color: fill,
            label: (_e = rule.title) !== null && _e !== void 0 ? _e : rule.name,
          });
        }
      }
      // Line-based symbolizer
      if ("Line" in symbolizer) {
        const stroke =
          (_f =
            symbolizer === null || symbolizer === void 0
              ? void 0
              : symbolizer.Line) === null || _f === void 0
            ? void 0
            : _f.stroke;
        if (stroke) {
          entries.push({
            color: stroke,
            label: (_g = rule.title) !== null && _g !== void 0 ? _g : rule.name,
          });
        }
      }
      // polygon-based symbolizer
      if ("Polygon" in symbolizer) {
        const polygonFill =
          (_h =
            symbolizer === null || symbolizer === void 0
              ? void 0
              : symbolizer.Polygon) === null || _h === void 0
            ? void 0
            : _h.fill;
        if (polygonFill) {
          entries.push({
            color: polygonFill,
            label: (_j = rule.title) !== null && _j !== void 0 ? _j : rule.name,
          });
        }
      }
    });
    return entries;
  }, [legend]);
  const gradient = useMemo(() => {
    var _a;
    if (!colorMap.length) return "";
    if (colorMap.length === 1) {
      return (
        ((_a = colorMap[0]) === null || _a === void 0 ? void 0 : _a.color) ||
        "#fff"
      ); // solid fill
    }
    return `linear-gradient(180deg, ${colorMap.map((c) => c.color).join(", ")})`;
  }, [colorMap]);
  return _jsx(Box, {
    className:
      "border border-black rounded-sm shadow-sm w-[18px] h-[18px] border-solid",
    sx: {
      background: gradient,
    },
  });
}
