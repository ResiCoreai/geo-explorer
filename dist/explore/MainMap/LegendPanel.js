import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import CloseFullscreenOutlinedIcon from "@mui/icons-material/CloseFullscreenOutlined";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import {
  Box,
  Collapse,
  Divider,
  IconButton,
  Switch,
  Typography,
} from "@mui/material";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { getLegendImageObjectUrl } from "../../utils/geoserver";
export function LegendPanel({ layers, selectedLayer }) {
  var _a;
  const auth = useAuth();
  const [showAll, setShowAll] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [legendUrls, setLegendUrls] = useState({});
  useEffect(() => {
    const fetchLegend = async (layer) => {
      var _a, _b;
      const layerId =
        (_a = layer.data) === null || _a === void 0 ? void 0 : _a.layer_id;
      const token =
        (_b = auth.user) === null || _b === void 0 ? void 0 : _b.access_token;
      if (!layerId || !token) return;
      try {
        const blobUrl = await getLegendImageObjectUrl(layerId);
        setLegendUrls((prev) => ({
          ...prev,
          [layerId]: blobUrl,
        }));
      } catch (err) {
        console.error(`Error loading legend for ${layerId}:`, err);
      }
    };
    const targetLayers = showAll ? layers : [selectedLayer];
    setLegendUrls({});
    targetLayers.forEach(fetchLegend);
  }, [
    layers,
    selectedLayer,
    showAll,
    (_a = auth.user) === null || _a === void 0 ? void 0 : _a.access_token,
  ]);
  const visibleLayers = showAll ? layers : [selectedLayer];
  return _jsxs(Box, {
    className:
      "w-[260px] rounded-lg shadow border border-gray-300 bg-white flex flex-col overflow-hidden",
    children: [
      _jsxs(Box, {
        className:
          "flex items-center justify-between px-4 py-2 border-b border-gray-200",
        children: [
          _jsx(Typography, {
            className:
              "text-[#2C343C] tracking-wide uppercase font-[400] text-[14px]",
            children: "Legend List",
          }),
          _jsx(IconButton, {
            size: "small",
            onClick: () => setCollapsed((prev) => !prev),
            "aria-label": collapsed ? "Expand legend" : "Collapse legend",
            children: collapsed
              ? _jsx(OpenInFullOutlinedIcon, { fontSize: "inherit" })
              : _jsx(CloseFullscreenOutlinedIcon, { fontSize: "inherit" }),
          }),
        ],
      }),
      _jsx(Divider, {}),
      _jsxs(Collapse, {
        in: !collapsed,
        children: [
          _jsx(Box, {
            className: "overflow-y-auto max-h-[500px]",
            children: visibleLayers.map((layer, index) => {
              const isSelected =
                layer.data.layer_id === selectedLayer.data.layer_id;
              const title = layer.data.display_name || layer.data.layer_id;
              const legendUrl = legendUrls[layer.data.layer_id];
              return _jsxs(
                Box,
                {
                  children: [
                    _jsxs(Box, {
                      className: classNames(
                        "px-4 pt-3 pb-2",
                        showAll && isSelected && "bg-blue-50",
                      ),
                      children: [
                        _jsx(Typography, {
                          className:
                            "text-[14px] font-[600] text-[#2C343C] leading-tight",
                          children: title,
                        }),
                        legendUrl &&
                          _jsx(Box, {
                            className: "pt-2 pb-1",
                            children: _jsx("img", {
                              src: legendUrl,
                              alt: `Legend for ${title}`,
                              className: "object-contain",
                            }),
                          }),
                      ],
                    }),
                    index < visibleLayers.length - 1 &&
                      _jsx(Divider, { className: "-mx-4" }),
                  ],
                },
                layer.data.layer_id,
              );
            }),
          }),
          _jsx(Divider, {}),
          _jsxs(Box, {
            className:
              "border-t border-gray-200 px-4 py-2 flex items-center justify-end gap-2",
            children: [
              _jsx(Typography, {
                className: "text-sm text-gray-700",
                children: "Show all visible legends",
              }),
              _jsx(Switch, {
                checked: showAll,
                onChange: () => setShowAll((prev) => !prev),
                size: "small",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
