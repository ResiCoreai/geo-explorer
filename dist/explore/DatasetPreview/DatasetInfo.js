import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import {
  climateVariableIcons,
  layerTypeIcons,
  typeDescription,
} from "../../explore/Sidebar/utils/icons";
export const DatasetInfo = () => {
  var _a;
  const dataset = useSelector(
    (state) =>
      state.explore.dataInventory.find(
        (dataset) => dataset.layer_id === state.explore.selectedDataset,
      ) ||
      state.explore.climateInventory.find(
        (dataset) => dataset.layer_id === state.explore.selectedDataset,
      ),
  );
  if (!dataset) return null;
  return _jsx(Box, {
    className: "p-4",
    children: _jsxs(Box, {
      className: "flex flex-col md:flex-row",
      children: [
        _jsxs(Box, {
          className: "flex-1 pr-0 md:pr-4",
          children: [
            _jsx(Typography, {
              className: "text-[16px] font-semibold",
              children: "Description",
            }),
            _jsx(Box, {
              className: "mt-2",
              children: _jsx(Typography, {
                variant: "body2",
                className: "text-gray-600",
                children: dataset.description,
              }),
            }),
          ],
        }),
        _jsx(Divider, {
          orientation: "vertical",
          flexItem: true,
          className: "my-4 md:my-0",
        }),
        _jsxs(Box, {
          className: "flex-1 pl-0 md:pl-4",
          children: [
            _jsx(Typography, {
              className: "text-[16px] font-semibold",
              children: "Attributes",
            }),
            _jsxs(Box, {
              className: "mt-2 flex justify-between items-center",
              children: [
                _jsx(Typography, {
                  variant: "body2",
                  color: "gray",
                  children: "Dataset Type",
                }),
                _jsx(Typography, {
                  className: "text-right capitalize",
                  children:
                    ((_a = dataset.dataset_info) === null || _a === void 0
                      ? void 0
                      : _a.dataset_category) === "climate"
                      ? "Climate"
                      : "DAC Tech",
                }),
              ],
            }),
            _jsxs(Box, {
              className: "mt-2 flex justify-between items-center",
              children: [
                _jsx(Typography, {
                  variant: "body2",
                  color: "gray",
                  children: "Dataset Category",
                }),
                _jsx(Typography, {
                  className: "text-right capitalize",
                  children: dataset.dataset_info.dataset_category,
                }),
              ],
            }),
            _jsxs(Box, {
              className: "mt-2 flex justify-between items-center",
              children: [
                _jsx(Typography, {
                  variant: "body2",
                  color: "gray",
                  children: "Layer Type",
                }),
                _jsxs(Box, {
                  className: "flex items-center",
                  children: [
                    layerTypeIcons.map(({ type, icon }) => {
                      var _a;
                      return ((_a = dataset.dataset_info) === null ||
                      _a === void 0
                        ? void 0
                        : _a.feature_type) === type
                        ? _jsxs(
                            Box,
                            {
                              className: "flex items-center",
                              children: [
                                icon({ className: "text-red-500" }),
                                _jsx(Typography, {
                                  className: "ml-2 capitalize",
                                  children: type,
                                }),
                              ],
                            },
                            type,
                          )
                        : null;
                    }),
                    climateVariableIcons.map(({ type, icon }) => {
                      var _a, _b, _c;
                      return ((_a = dataset.dataset_info) === null ||
                      _a === void 0
                        ? void 0
                        : _a.climate_variable) === type
                        ? _jsxs(
                            Box,
                            {
                              className: "flex items-center",
                              children: [
                                icon({ className: "text-red-500" }),
                                _jsx(Typography, {
                                  className: "ml-2 capitalize",
                                  children:
                                    (_c =
                                      (_b = typeDescription[type]) === null ||
                                      _b === void 0
                                        ? void 0
                                        : _b.description) !== null &&
                                    _c !== void 0
                                      ? _c
                                      : type,
                                }),
                              ],
                            },
                            type,
                          )
                        : null;
                    }),
                  ],
                }),
              ],
            }),
            _jsxs(Box, {
              className: "mt-2 flex justify-between items-center",
              children: [
                _jsx(Typography, {
                  variant: "body2",
                  color: "gray",
                  children: "Data Source",
                }),
                _jsx(Typography, {
                  className: "text-right capitalize",
                  children: "N/A",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
};
