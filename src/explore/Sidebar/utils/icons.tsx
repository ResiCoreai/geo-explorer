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
import { ReactNode } from "react";

import { MapLayer } from "@ncsa/geo-explorer/store/explore/types";

export const layerTypeIcons: Array<{
  type: "point" | "line" | "polygon" | "raster";
  icon: (props: { className?: string }) => ReactNode;
}> = [
  {
    type: "point",
    icon: (props) => <ScatterPlotIcon {...props} />,
  },
  {
    type: "line",
    icon: (props) => <RouteIcon {...props} />,
  },
  {
    type: "polygon",
    icon: (props) => <DashboardIcon {...props} />,
  },
  {
    type: "raster",
    icon: (props) => <ImageOutlinedIcon {...props} />,
  },
];
export const categoryIcons: Array<{
  type: "power" | "administrative" | "storage" | "water";
  icon: (props: { className?: string }) => ReactNode;
}> = [
  {
    type: "power",
    icon: (props) => <CellTowerIcon {...props} />,
  },
  {
    type: "water",
    icon: (props) => <WaterOutlinedIcon {...props} />,
  },
  {
    type: "administrative",
    icon: (props) => <AccountBalanceOutlinedIcon {...props} />,
  },
  {
    type: "storage",
    icon: (props) => <WarehouseOutlinedIcon {...props} />,
  },
];

export const climateVariableIcons: Array<{
  type:
    | "hurs"
    | "huss"
    | "pr"
    | "rlds"
    | "rsds"
    | "sfcWind"
    | "tas"
    | "tasmax"
    | "tasmin";
  icon: (props: { className?: string }) => ReactNode;
}> = [
  {
    type: "hurs",
    icon: (props) => <Opacity {...props} />,
  },
  {
    type: "huss",
    icon: (props) => <Opacity {...props} />,
  },
  {
    type: "pr",
    icon: (props) => <ShowerIcon {...props} />,
  },
  {
    type: "rlds",
    icon: (props) => <SensorsIcon {...props} />,
  },
  {
    type: "rsds",
    icon: (props) => <SensorsIcon {...props} />,
  },
  {
    type: "sfcWind",
    icon: (props) => <AirRoundedIcon {...props} />,
  },
  {
    type: "tas",
    icon: (props) => <DeviceThermostatIcon {...props} />,
  },
  {
    type: "tasmax",
    icon: (props) => <DeviceThermostatIcon {...props} />,
  },
  {
    type: "tasmin",
    icon: (props) => <DeviceThermostatIcon {...props} />,
  },
];

type VariableDescription = {
  description: string;
  units: string;
  default_style_name: string;
};

// TODO: Move this into configuration JSON
export const typeDescription: Record<string, VariableDescription> = {
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

export const climateScenarioIcons: Array<{
  type:
    | "All-Model Ensemble Projection"
    | "Extreme Cold Scenario Projection"
    | "Extreme Heat Scenario Projection"
    | "High Humidity Scenario Projection"
    | "Severe Drought Scenario Projection";
  icon: (props: { className?: string }) => ReactNode;
}> = [
  {
    type: "All-Model Ensemble Projection",
    icon: (props) => <AssignmentIcon {...props} />,
  },
  {
    type: "Extreme Cold Scenario Projection",
    icon: (props) => <AssignmentIcon {...props} />,
  },
  {
    type: "Extreme Heat Scenario Projection",
    icon: (props) => <AssignmentIcon {...props} />,
  },
  {
    type: "High Humidity Scenario Projection",
    icon: (props) => <AssignmentIcon {...props} />,
  },
  {
    type: "Severe Drought Scenario Projection",
    icon: (props) => <AssignmentIcon {...props} />,
  },
];

export function getLayerIconByType(layer: MapLayer) {
  const key =
    layer.data.dataset_info.dataset_type === "raster"
      ? "raster"
      : layer.data.dataset_info.feature_type;

  return layerTypeIcons.find(({ type }) => type === key)?.icon;
}

export function getLayerIconByCategory(layer: MapLayer) {
  const key = layer.data.dataset_info.dataset_category;
  return categoryIcons.find(({ type }) => type === key)?.icon;
}

export function getClimateVariableIcon(layer: MapLayer) {
  if ("climate_variable" in layer.data.dataset_info) {
    const key = layer.data.dataset_info?.climate_variable;
    return climateVariableIcons.find(({ type }) => type === key)?.icon;
  }
  return null;
}

export function getClimateScenarioIcon(layer: MapLayer) {
  if ("climate_scenario" in layer.data.dataset_info) {
    const key = layer.data.dataset_info?.climate_scenario;
    return climateScenarioIcons.find(({ type }) => type === key)?.icon;
  }
  return null;
}
