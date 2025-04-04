import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import {
  CloseOutlined,
  FileDownloadOutlined,
  PaletteOutlined,
  RemoveOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DatasetDescriptionTooltip } from "../../icons/DatasetDescriptionTooltip";
import { removeLayer } from "../../store/explore/slice";
import { downloadDataset } from "../../utils/geoserver";
export function Header({ onOpenStyleSettings, onClose }) {
  const dispatch = useDispatch();
  const selectedLayer = useSelector((state) =>
    state.explore.mapLayers.find(
      (layer) => layer.data.layer_id === state.explore.selectedLayer,
    ),
  );
  if (!selectedLayer) return null;
  return _jsxs(Stack, {
    direction: "row",
    className: "select-none items-center",
    children: [
      _jsx(Stack, {
        direction: "column",
        children: _jsxs(Stack, {
          direction: "row",
          className: "items-center",
          children: [
            _jsx(Typography, {
              className: "font-medium text-[16px]",
              children:
                selectedLayer === null || selectedLayer === void 0
                  ? void 0
                  : selectedLayer.data.display_name,
            }),
            _jsx(Tooltip, {
              title:
                selectedLayer === null || selectedLayer === void 0
                  ? void 0
                  : selectedLayer.data.description,
              placement: "top",
              children: _jsx(Box, {
                className: "ml-[6px] pointer-events-auto",
                children: _jsx(DatasetDescriptionTooltip, {}),
              }),
            }),
          ],
        }),
      }),
      _jsx(Box, { className: "flex-1" }),
      _jsx(Button, {
        variant: "contained",
        disableElevation: true,
        className: "bg-[#2C343C]",
        startIcon: _jsx(RemoveOutlined, {}),
        onClick: () => {
          dispatch(removeLayer({ layer_id: selectedLayer.data.layer_id }));
        },
        children: "Remove",
      }),
      _jsx(IconButton, {
        disabled: selectedLayer.data.dataset_info.dataset_type === "raster",
        onClick: () => {
          downloadDataset(selectedLayer.data.layer_id);
        },
        children: _jsx(FileDownloadOutlined, {}),
      }),
      _jsx(IconButton, {
        onClick: onOpenStyleSettings,
        children: _jsx(PaletteOutlined, {}),
      }),
      _jsx(IconButton, { onClick: onClose, children: _jsx(CloseOutlined, {}) }),
    ],
  });
}
