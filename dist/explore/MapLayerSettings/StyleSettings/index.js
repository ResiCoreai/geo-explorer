import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { parseColor } from "@react-stately/color";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ColorInput } from "../../../explore/MapLayerSettings/StyleSettings/ColorInput";
import { NumberInput } from "../../../explore/MapLayerSettings/StyleSettings/NumberInput";
import { setLayerStyleSLD } from "../../../store/explore/actions";
import {
  defaultLayerStyle,
  resetLayerStyle,
} from "../../../store/explore/slice";
export function StyleSettings({ open, onClose }) {
  const dispatch = useDispatch();
  const selectedLayer = useSelector((state) =>
    state.explore.mapLayers.find(
      (layer) => layer.data.layer_id === state.explore.selectedLayer,
    ),
  );
  const [style, setStyle] = useState(defaultLayerStyle);
  useEffect(() => {
    if (selectedLayer) {
      setStyle(selectedLayer.style);
    }
  }, [
    selectedLayer === null || selectedLayer === void 0
      ? void 0
      : selectedLayer.data.layer_id,
  ]);
  const timerRef = useRef(-1);
  const updateStyleDebounced = (styleUpdate) => {
    clearTimeout(timerRef.current);
    if (selectedLayer) {
      const newStyle = {
        ...style,
        ...styleUpdate,
      };
      setStyle(newStyle);
      timerRef.current = window.setTimeout(() => {
        dispatch(setLayerStyleSLD(selectedLayer.data.layer_id, newStyle));
      }, 200);
    }
  };
  const reset = () => {
    if (!selectedLayer) return;
    setStyle(defaultLayerStyle);
    dispatch(
      resetLayerStyle({
        layer_id: selectedLayer.data.layer_id,
      }),
    );
  };
  if (!selectedLayer) return null;
  return _jsx(Modal, {
    open: open,
    onClose: onClose,
    disablePortal: true,
    children: _jsxs(Paper, {
      className:
        "fixed left-0 right-0 top-0 bottom-0 w-[535px] h-[60%] m-auto rounded-[6px] overflow-scroll no-scrollbar",
      children: [
        _jsxs(Stack, {
          direction: "row",
          className: "sticky top-0 pt-[24px] px-[32px] bg-white z-[1]",
          children: [
            _jsx(Typography, {
              className: "text-[20px]",
              children: "Style Settings",
            }),
            _jsx(Box, { className: "flex-1" }),
            _jsx(IconButton, {
              onClick: onClose,
              children: _jsx(CloseOutlined, {}),
            }),
          ],
        }),
        _jsxs(Box, {
          className: "pb-[24px] px-[32px]",
          children: [
            selectedLayer.data.dataset_info.dataset_type === "vector" &&
              selectedLayer.data.dataset_info.feature_type === "point" &&
              _jsxs(_Fragment, {
                children: [
                  _jsx(Divider, { className: "my-[20px]" }),
                  _jsx(Typography, {
                    className: "font-bold text-[16px]",
                    children: "Radius",
                  }),
                  _jsx(NumberInput, {
                    value: style.radius,
                    onChange: (value) => {
                      updateStyleDebounced({
                        radius: value,
                      });
                    },
                    min: 1,
                    max: 20,
                    renderValue: String,
                  }),
                ],
              }),
            selectedLayer.data.dataset_info.dataset_type === "vector" &&
              (selectedLayer.data.dataset_info.feature_type === "point" ||
                selectedLayer.data.dataset_info.feature_type === "polygon") &&
              _jsxs(_Fragment, {
                children: [
                  _jsx(Divider, { className: "my-[20px]" }),
                  _jsx(Typography, {
                    className: "font-bold text-[16px]",
                    children: "Fill Color",
                  }),
                  _jsx(ColorInput, {
                    value: parseColor(style.fillColor).withChannelValue(
                      "alpha",
                      style.fillOpacity,
                    ),
                    onChange: (color) => {
                      updateStyleDebounced({
                        fillColor: color.toString("hex"),
                        fillOpacity: color.getChannelValue("alpha"),
                      });
                    },
                  }),
                ],
              }),
            selectedLayer.data.dataset_info.dataset_type !== "raster" &&
              _jsxs(_Fragment, {
                children: [
                  _jsx(Divider, { className: "my-[20px]" }),
                  _jsx(Typography, {
                    className: "font-bold text-[16px]",
                    children: "Stroke Width",
                  }),
                  _jsx(NumberInput, {
                    value: style.strokeWidth,
                    onChange: (value) => {
                      updateStyleDebounced({
                        strokeWidth: value,
                      });
                    },
                    min: 0,
                    max: 10,
                    renderValue: String,
                  }),
                  _jsx(Divider, { className: "my-[20px]" }),
                  _jsx(Typography, {
                    className: "font-bold text-[16px]",
                    children: "Stroke Color",
                  }),
                  _jsx(ColorInput, {
                    value: parseColor(style.strokeColor).withChannelValue(
                      "alpha",
                      style.strokeOpacity,
                    ),
                    onChange: (color) => {
                      updateStyleDebounced({
                        strokeColor: color.toString("hex"),
                        strokeOpacity: color.getChannelValue("alpha"),
                      });
                    },
                  }),
                ],
              }),
            _jsx(Divider, { className: "my-[20px]" }),
            _jsx(Typography, {
              className: "font-bold text-[16px]",
              children: "Layer Visibility",
            }),
            _jsx(NumberInput, {
              value: style.layerOpacity,
              onChange: (value) => {
                updateStyleDebounced({
                  layerOpacity: value,
                });
              },
              min: 0,
              max: 1,
              step: 0.1,
              renderValue: (alpha) => alpha * 100 + "%",
            }),
            _jsxs(Stack, {
              direction: "row",
              className: "mt-[64px] gap-[8px]",
              children: [
                _jsx(Box, { className: "flex-1" }),
                _jsx(Button, {
                  variant: "outlined",
                  disableElevation: true,
                  onClick: () => {
                    reset();
                  },
                  children: "Reset",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
