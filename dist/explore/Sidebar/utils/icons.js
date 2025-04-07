import { jsx as _jsx } from "react/jsx-runtime";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AirRoundedIcon from "@mui/icons-material/AirRounded";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CellTowerIcon from "@mui/icons-material/CellTower";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Opacity from "@mui/icons-material/Opacity";
import RouteIcon from "@mui/icons-material/Route";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import SensorsIcon from "@mui/icons-material/Sensors";
import ShowerIcon from "@mui/icons-material/Shower";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import WaterOutlinedIcon from "@mui/icons-material/WaterOutlined";
export const layerTypeIcons = [
  {
    type: "point",
    icon: (props) => _jsx(ScatterPlotIcon, { ...props }),
  },
  {
    type: "line",
    icon: (props) => _jsx(RouteIcon, { ...props }),
  },
  {
    type: "polygon",
    icon: (props) => _jsx(DashboardIcon, { ...props }),
  },
  {
    type: "raster",
    icon: (props) => _jsx(ImageOutlinedIcon, { ...props }),
  },
];
export const categoryIcons = [
  {
    type: "power",
    icon: (props) => _jsx(CellTowerIcon, { ...props }),
  },
  {
    type: "water",
    icon: (props) => _jsx(WaterOutlinedIcon, { ...props }),
  },
  {
    type: "administrative",
    icon: (props) => _jsx(AccountBalanceOutlinedIcon, { ...props }),
  },
  {
    type: "storage",
    icon: (props) => _jsx(WarehouseOutlinedIcon, { ...props }),
  },
];
export const climateVariableIcons = [
  {
    type: "hurs",
    icon: (props) => _jsx(Opacity, { ...props }),
  },
  {
    type: "huss",
    icon: (props) => _jsx(Opacity, { ...props }),
  },
  {
    type: "pr",
    icon: (props) => _jsx(ShowerIcon, { ...props }),
  },
  {
    type: "rlds",
    icon: (props) => _jsx(SensorsIcon, { ...props }),
  },
  {
    type: "rsds",
    icon: (props) => _jsx(SensorsIcon, { ...props }),
  },
  {
    type: "sfcWind",
    icon: (props) => _jsx(AirRoundedIcon, { ...props }),
  },
  {
    type: "tas",
    icon: (props) => _jsx(DeviceThermostatIcon, { ...props }),
  },
  {
    type: "tasmax",
    icon: (props) => _jsx(DeviceThermostatIcon, { ...props }),
  },
  {
    type: "tasmin",
    icon: (props) => _jsx(DeviceThermostatIcon, { ...props }),
  },
];
// TODO: Move this into configuration JSON
export const typeDescription = {
  hurs: {
    description: "Near-Surface Relative Humidity",
    units: "percentage",
    default_style_name: "hurs",
  },
  huss: {
    description: "Near-Surface Specific Humidity",
    units: "dimensionless ratio (kg/kg)",
    default_style_name: "huss",
  },
  pr: {
    description: "Precipitation",
    units: "kg m-2 s-1",
    default_style_name: "pr",
  },
  rlds: {
    description: "Surface Downwelling Longwave Radiation",
    units: "W m-2",
    default_style_name: "rlds",
  },
  rsds: {
    description: "Surface Downwelling Shortwave Radiation",
    units: "W m-2",
    default_style_name: "rsds",
  },
  sfcWind: {
    description: "Near-Surface Wind Speed",
    units: "m s-1",
    default_style_name: "sfcWind",
  },
  tas: {
    description: "Near-Surface Air Temperature",
    units: "Degrees Kelvin",
    default_style_name: "tas",
  },
  tasmax: {
    description: "Maximum Near-Surface Air Temperature",
    units: "Degrees Kelvin",
    default_style_name: "tasmax",
  },
  tasmin: {
    description: "Minimum Near-Surface Air Temperature",
    units: "Degrees Kelvin",
    default_style_name: "tasmin",
  },
};
export const climateScenarioIcons = [
  {
    type: "All-Model Ensemble Projection",
    icon: (props) => _jsx(AssignmentIcon, { ...props }),
  },
  {
    type: "Extreme Cold Scenario Projection",
    icon: (props) => _jsx(AssignmentIcon, { ...props }),
  },
  {
    type: "Extreme Heat Scenario Projection",
    icon: (props) => _jsx(AssignmentIcon, { ...props }),
  },
  {
    type: "High Humidity Scenario Projection",
    icon: (props) => _jsx(AssignmentIcon, { ...props }),
  },
  {
    type: "Severe Drought Scenario Projection",
    icon: (props) => _jsx(AssignmentIcon, { ...props }),
  },
];
export function getLayerIconByType(layer) {
  var _a;
  const key =
    layer.data.dataset_info.dataset_type === "raster"
      ? "raster"
      : layer.data.dataset_info.feature_type;
  return (_a = layerTypeIcons.find(({ type }) => type === key)) === null ||
    _a === void 0
    ? void 0
    : _a.icon;
}
export function getLayerIconByCategory(layer) {
  var _a;
  const key = layer.data.dataset_info.dataset_category;
  return (_a = categoryIcons.find(({ type }) => type === key)) === null ||
    _a === void 0
    ? void 0
    : _a.icon;
}
export function getClimateVariableIcon(layer) {
  var _a, _b;
  if ("climate_variable" in layer.data.dataset_info) {
    const key =
      (_a = layer.data.dataset_info) === null || _a === void 0
        ? void 0
        : _a.climate_variable;
    return (_b = climateVariableIcons.find(({ type }) => type === key)) ===
      null || _b === void 0
      ? void 0
      : _b.icon;
  }
  return null;
}
export function getClimateScenarioIcon(layer) {
  var _a, _b;
  if ("climate_scenario" in layer.data.dataset_info) {
    const key =
      (_a = layer.data.dataset_info) === null || _a === void 0
        ? void 0
        : _a.climate_scenario;
    return (_b = climateScenarioIcons.find(({ type }) => type === key)) ===
      null || _b === void 0
      ? void 0
      : _b.icon;
  }
  return null;
}
