import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import {
  AddOutlined,
  CloseOutlined,
  RemoveOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DatasetInfo } from "../../explore/DatasetPreview/DatasetInfo";
import {
  addLayer,
  removeLayer,
  selectDataset,
} from "../../store/explore/slice";
export function DatasetPreview() {
  const dispatch = useDispatch();
  const mapLayers = useSelector((state) => state.explore.mapLayers);
  const dataset = useSelector(
    (state) =>
      state.explore.dataInventory.find(
        (dataset) => dataset.layer_id === state.explore.selectedDataset,
      ) ||
      state.explore.climateInventory.find(
        (dataset) => dataset.layer_id === state.explore.selectedDataset,
      ),
  );
  const addedToLayers = useMemo(() => {
    return mapLayers.some(
      (layer) =>
        layer.data.layer_id ===
        (dataset === null || dataset === void 0 ? void 0 : dataset.layer_id),
    );
  }, [mapLayers, dataset]);
  const onClose = useCallback(() => {
    dispatch(selectDataset({ layer_id: null }));
  }, []);
  if (!dataset) return null;
  return _jsx(Modal, {
    open: !!dataset,
    onClose: onClose,
    children: _jsxs(Paper, {
      className:
        "fixed left-0 right-0 top-0 bottom-0 m-auto rounded-[6px] py-[24px] px-[32px] overflow-scroll no-scrollbar w-[60%] h-fit",
      children: [
        _jsxs(Stack, {
          direction: "row",
          className: "items-center",
          children: [
            _jsx(Typography, {
              className: "font-bold text-[20px]",
              children:
                dataset === null || dataset === void 0
                  ? void 0
                  : dataset.display_name,
            }),
            _jsx(Box, { className: "flex-1" }),
            dataset &&
              (addedToLayers
                ? _jsx(Button, {
                    variant: "contained",
                    disableElevation: true,
                    className: "bg-[#2C343C]",
                    startIcon: _jsx(RemoveOutlined, {}),
                    onClick: () => {
                      dispatch(removeLayer({ layer_id: dataset.layer_id }));
                    },
                    children: "Remove",
                  })
                : _jsx(Button, {
                    variant: "contained",
                    disableElevation: true,
                    startIcon: _jsx(AddOutlined, {}),
                    onClick: () => {
                      dispatch(addLayer({ layer_id: dataset.layer_id }));
                    },
                    children: "Add to map",
                  })),
            _jsx(IconButton, {
              onClick: onClose,
              children: _jsx(CloseOutlined, {}),
            }),
          ],
        }),
        _jsx(DatasetInfo, {}),
      ],
    }),
  });
}
