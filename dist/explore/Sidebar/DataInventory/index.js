import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import { FilterAltOutlined, Search } from "@mui/icons-material";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import {
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Tab,
  Tabs,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { DatabaseHeavy } from "../../../icons/DatabaseHeavy";
import { ClimateList } from "../../../explore/Sidebar/DataInventory/ClimateList";
import { TechItem } from "../../../explore/Sidebar/DataInventory/TechItem";
import { Section } from "../../../explore/Sidebar/Section";
import {
  categoryIcons,
  layerTypeIcons,
} from "../../../explore/Sidebar/utils/icons";
export function DataInventory() {
  const techDatasets = useSelector((state) => state.explore.dataInventory);
  const climateDatasets = useSelector(
    (state) => state.explore.climateInventory,
  );
  const [tabIndex, setTabIndex] = useState(0);
  const [techSelectedOption, setTechSelectedOption] =
    useState("dataset_category");
  const [climateSelectedOption, setClimateSelectedOption] =
    useState("climate_scenario");
  const handleTechSelectChange = (event) => {
    setTechSelectedOption(event.target.value);
  };
  const handleClimateSelectChange = (event) => {
    setClimateSelectedOption(event.target.value);
  };
  return _jsx(Section, {
    icon: _jsx(DatabaseHeavy, { size: 16 }),
    weight: 2,
    title: "Data Inventory",
    extras: _jsxs(Box, {
      className: "flex flex-row gap-[6px]",
      children: [
        _jsx(IconButton, {
          size: "small",
          onClick: (e) => e.stopPropagation(),
          children: _jsx(Search, { className: "text-[#0000008A]" }),
        }),
        _jsx(IconButton, {
          size: "small",
          onClick: (e) => e.stopPropagation(),
          children: _jsx(FilterAltOutlined, { className: "text-[#0000008A]" }),
        }),
      ],
    }),
    children: _jsxs(Box, {
      className: "flex flex-col h-full",
      children: [
        _jsx(Box, {
          className: "flex-none px-[32px]",
          children: _jsxs(Tabs, {
            centered: true,
            className: "w-full",
            value: tabIndex,
            onChange: (_, newValue) => setTabIndex(newValue),
            children: [
              _jsx(Tab, {
                label: "DAC Tech",
                className: "flex-1 min-w-0 capitalize",
              }),
              _jsx(Tab, {
                label: "Climate Data",
                className: "flex-1 min-w-0 capitalize",
              }),
            ],
          }),
        }),
        tabIndex === 0 &&
          _jsxs(_Fragment, {
            children: [
              _jsx(Box, {
                mt: 2,
                className: "flex-none px-[32px]",
                children: _jsxs(Select, {
                  value: techSelectedOption,
                  onChange: handleTechSelectChange,
                  fullWidth: true,
                  variant: "standard",
                  disableUnderline: true,
                  className:
                    "bg-[#F3F4F6] text-[14px] h-[34px] px-4 py-2 rounded-sm shadow-sm focus:bg-[#F3F4F6] hover:bg-[#F3F4F6] flex items-center",
                  startAdornment: _jsx(InputAdornment, {
                    className: "text-gray-600 text-[14px]",
                    position: "start",
                    children: _jsx(FolderOpenOutlinedIcon, {}),
                  }),
                  children: [
                    _jsx(MenuItem, {
                      value: "dataset_category",
                      children: "Dataset Category",
                    }),
                    _jsx(MenuItem, {
                      value: "feature_type",
                      children: "Feature Type",
                    }),
                  ],
                }),
              }),
              _jsx(Box, {
                className: "flex-auto overflow-scroll no-scrollbar",
                children: (techSelectedOption === "feature_type"
                  ? layerTypeIcons
                  : categoryIcons
                ).map(({ type, icon }) =>
                  _jsxs(
                    Box,
                    {
                      className: "my-[20px]",
                      children: [
                        _jsxs(Box, {
                          className:
                            "flex flex-row items-center gap-[6px] text-[#13294B99] text-[11px] px-[32px] capitalize font-bold",
                          children: [
                            icon({ className: "w-5 h-5" }),
                            type,
                            " ",
                            techSelectedOption === "feature_type"
                              ? "Feature"
                              : "Data",
                          ],
                        }),
                        _jsx(Box, {
                          className: "mt-[5px]",
                          children:
                            techDatasets.filter((layer) => {
                              var _a;
                              return (
                                (layer.dataset_info.dataset_type === "raster"
                                  ? "raster"
                                  : (_a = layer.dataset_info) === null ||
                                      _a === void 0
                                    ? void 0
                                    : _a[techSelectedOption]) === type
                              );
                            }).length > 0
                              ? techDatasets
                                  .filter((layer) => {
                                    var _a;
                                    return (
                                      (layer.dataset_info.dataset_type ===
                                      "raster"
                                        ? "raster"
                                        : (_a = layer.dataset_info) === null ||
                                            _a === void 0
                                          ? void 0
                                          : _a[techSelectedOption]) === type
                                    );
                                  })
                                  .map((dataset) =>
                                    _jsx(
                                      Box,
                                      {
                                        className:
                                          "flex justify-center px-[32px]",
                                        children: _jsx(TechItem, {
                                          dataset: dataset,
                                        }),
                                      },
                                      dataset.layer_id,
                                    ),
                                  )
                              : _jsx(Box, {
                                  className:
                                    "text-gray-400 text-sm italic px-[32px]",
                                  children:
                                    "Datasets will be available soon...",
                                }),
                        }),
                      ],
                    },
                    type,
                  ),
                ),
              }),
            ],
          }),
        tabIndex === 1 &&
          _jsxs(_Fragment, {
            children: [
              _jsx(Box, {
                mt: 2,
                className: "flex-none px-[32px]",
                children: _jsxs(Select, {
                  value: climateSelectedOption,
                  onChange: handleClimateSelectChange,
                  fullWidth: true,
                  variant: "standard",
                  disableUnderline: true,
                  className:
                    "bg-[#F3F4F6] text-[14px] h-[34px] px-4 py-2 rounded-sm shadow-sm focus:bg-[#F3F4F6] hover:bg-[#F3F4F6] flex items-center",
                  startAdornment: _jsx(InputAdornment, {
                    className: "text-gray-600 text-[14px]",
                    position: "start",
                    children: _jsx(FolderOpenOutlinedIcon, {}),
                  }),
                  children: [
                    _jsx(MenuItem, {
                      value: "climate_scenario",
                      children: "Climate Model Scenarios",
                    }),
                    _jsx(MenuItem, {
                      value: "climate_variable",
                      children: "Climate Variables",
                    }),
                  ],
                }),
              }),
              _jsx(ClimateList, {
                climateDatasets: climateDatasets,
                climateSelectedOption: climateSelectedOption,
              }),
            ],
          }),
      ],
    }),
  });
}
