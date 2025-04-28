
import {WFSFeatureTable, WFSFeatureTableProps} from "@ncsa/geo-explorer/explore/components/WFSFeatureTable";
import {DatasetInfo} from "@ncsa/geo-explorer/explore/DatasetPreview/DatasetInfo";
import {DatasetPreview} from "@ncsa/geo-explorer/explore/DatasetPreview";
import {RippleOverlay} from "@ncsa/geo-explorer/explore/MainMap/RippleOverlay/RippleOverlay";
import {RippleEffects, RippleEffectsProps} from "@ncsa/geo-explorer/explore/MainMap/RippleOverlay/RippleEffects";
import {MainMap} from "@ncsa/geo-explorer/explore/MainMap";
import {LegendPanel, LegendPanelProps} from "@ncsa/geo-explorer/explore/MainMap/LegendPanel";
import {WMSLayer, WMSLayerProps} from "@ncsa/geo-explorer/explore/MainMap/WMSLayer";
import {WMSLayerSimple, WMSLayerSimpleProps} from "@ncsa/geo-explorer/explore/MainMap/WMSLayerSimple";
import {WMSLayerTemporal, WMSLayerTemporalProps} from "@ncsa/geo-explorer/explore/MainMap/WMSLayerTemporal";
import {StyleSettings, StyleSettingsProps} from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings";
import {ColorInput, ColorInputProps} from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/ColorInput";
import {NumberInput, NumberInputProps} from "@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/NumberInput";
import {Header, HeaderProps} from "@ncsa/geo-explorer/explore/MapLayerSettings/Header";
import {MapLayerSettings} from "@ncsa/geo-explorer/explore/MapLayerSettings";
import {TimeSelector} from "@ncsa/geo-explorer/explore/MapLayerSettings/TimeSelector";
import {
  SimpleLayerItem,
  SimpleLayerItemProps,
} from '@ncsa/geo-explorer/explore/Sidebar/DataInventory/SimpleLayerItem';
import {SimpleLayerList} from "@ncsa/geo-explorer/explore/Sidebar/DataInventory/SimpleLayerList";
import {
  TemporalLayerItem,
  TemporalLayerItemProps
} from "@ncsa/geo-explorer/explore/Sidebar/DataInventory/TemporalLayerItem";
import {
  TemporalLayerList,
  TemporalLayerListProps
} from "@ncsa/geo-explorer/explore/Sidebar/DataInventory/TemporalLayerList";
import {
  CategoricalLegendIcon,
  CategoricalLegendIconProps
} from "@ncsa/geo-explorer/explore/Sidebar/MapLayers/CategoricalLegendIcon";
import {
  ClimateLayerSummary,
  ClimateLayerSummaryProps
} from "@ncsa/geo-explorer/explore/Sidebar/MapLayers/ClimateLayerSummary";
import {ClimateLegendIcon, ClimateLegendIconProps} from "@ncsa/geo-explorer/explore/Sidebar/MapLayers/ClimateLegendIcon";
import {MapLayers} from "@ncsa/geo-explorer/explore/Sidebar/MapLayers";
import {MapLayerItem, MapLayerItemProps} from "@ncsa/geo-explorer/explore/Sidebar/MapLayers/MapLayerItem";
import {SingleLegendIcon, SingleLegendIconProps} from "@ncsa/geo-explorer/explore/Sidebar/MapLayers/SingleLegendIcon";
import {BaseMaps} from "@ncsa/geo-explorer/explore/Sidebar/BaseMaps";
import {Sidebar} from "@ncsa/geo-explorer/explore/Sidebar";
import {SidebarSection, SidebarSectionProps} from "@ncsa/geo-explorer/explore/Sidebar/SidebarSection";
import {SelectedFeatures} from "@ncsa/geo-explorer/explore/SelectedFeatures";


// TODO: need to add more
export interface ComponentRegistry {
  SimpleLayerItem: React.ComponentType<SimpleLayerItemProps>;
  WFSFeatureTable: React.ComponentType<WFSFeatureTableProps>;
  DatasetInfo: React.ComponentType;
  DatasetPreview: React.ComponentType;
  RippleOverlay: React.ComponentType;
  RippleEffects: React.ComponentType<RippleEffectsProps>
  MainMap: React.ComponentType;
  LegendPanel: React.ComponentType<LegendPanelProps>;
  WMSLayer: React.ComponentType<WMSLayerProps>;
  WMSLayerSimple: React.ComponentType<WMSLayerSimpleProps>;
  WMSLayerTemporal: React.ComponentType<WMSLayerTemporalProps>;
  StyleSettings: React.ComponentType<StyleSettingsProps>;
  ColorInput: React.ComponentType<ColorInputProps>;
  NumberInput: React.ComponentType<NumberInputProps>;
  Header: React.ComponentType<HeaderProps>;
  MapLayerSettings: React.ComponentType;
  TimeSelector: React.ComponentType;
  SimpleLayerList: React.ComponentType;
  TemporalLayerItem: React.ComponentType<TemporalLayerItemProps>;
  TemporalLayerList: React.ComponentType<TemporalLayerListProps>;
  CategoricalLegendIcon:React.ComponentType<CategoricalLegendIconProps>;
  ClimateLayerSummary:React.ComponentType<ClimateLayerSummaryProps>;
  ClimateLegendIcon: React.ComponentType<ClimateLegendIconProps>;
  MapLayers: React.ComponentType;
  MapLayerItem: React.ComponentType<MapLayerItemProps>;
  SingleLegendIcon: React.ComponentType<SingleLegendIconProps>;
  BaseMaps:React.ComponentType;
  Sidebar: React.ComponentType;
  SidebarSection: React.ComponentType<SidebarSectionProps>;
  SelectedFeatures: React.ComponentType;
}

export const defaultComponents: ComponentRegistry = {
  SimpleLayerItem,
  WFSFeatureTable,
  DatasetInfo,
  DatasetPreview,
  RippleOverlay,
  RippleEffects,
  MainMap,
  LegendPanel,
  WMSLayer,
  WMSLayerSimple,
  WMSLayerTemporal,
  StyleSettings,
  ColorInput,
  NumberInput,
  Header,
  MapLayerSettings,
  TimeSelector,
  SimpleLayerList,
  TemporalLayerItem,
  TemporalLayerList,
  CategoricalLegendIcon,
  ClimateLayerSummary,
  ClimateLegendIcon,
  MapLayers,
  MapLayerItem,
  SingleLegendIcon,
  BaseMaps,
  Sidebar,
  SidebarSection,
  SelectedFeatures
};
