import { DatasetPreview } from '@ncsa/geo-explorer/explore/DatasetPreview';
import { DatasetInfo } from '@ncsa/geo-explorer/explore/DatasetPreview/DatasetInfo';
import { MainMap } from '@ncsa/geo-explorer/explore/MainMap';
import { LegendPanel } from '@ncsa/geo-explorer/explore/MainMap/LegendPanel';
import { RippleEffects } from '@ncsa/geo-explorer/explore/MainMap/RippleOverlay/RippleEffects';
import { RippleOverlay } from '@ncsa/geo-explorer/explore/MainMap/RippleOverlay/RippleOverlay';
import { WMSLayer } from '@ncsa/geo-explorer/explore/MainMap/WMSLayer';
import { WMSLayerSimple } from '@ncsa/geo-explorer/explore/MainMap/WMSLayerSimple';
import { WMSLayerTemporal } from '@ncsa/geo-explorer/explore/MainMap/WMSLayerTemporal';
import { MapLayerSettings } from '@ncsa/geo-explorer/explore/MapLayerSettings';
import { Header } from '@ncsa/geo-explorer/explore/MapLayerSettings/Header';
import { StyleSettings } from '@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings';
import { ColorInput } from '@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/ColorInput';
import { NumberInput } from '@ncsa/geo-explorer/explore/MapLayerSettings/StyleSettings/NumberInput';
import { TimeSelector } from '@ncsa/geo-explorer/explore/MapLayerSettings/TimeSelector';
import { SelectedFeatures } from '@ncsa/geo-explorer/explore/SelectedFeatures';
import { Sidebar } from '@ncsa/geo-explorer/explore/Sidebar';
import { BaseMaps } from '@ncsa/geo-explorer/explore/Sidebar/BaseMaps';
import { DataInventory } from '@ncsa/geo-explorer/explore/Sidebar/DataInventory';
import { SimpleLayerItem } from '@ncsa/geo-explorer/explore/Sidebar/DataInventory/SimpleLayerItem';
import { SimpleLayerList } from '@ncsa/geo-explorer/explore/Sidebar/DataInventory/SimpleLayerList';
import { TemporalLayerItem } from '@ncsa/geo-explorer/explore/Sidebar/DataInventory/TemporalLayerItem';
import { TemporalLayerList } from '@ncsa/geo-explorer/explore/Sidebar/DataInventory/TemporalLayerList';
import { MapLayers } from '@ncsa/geo-explorer/explore/Sidebar/MapLayers';
import { LegendIcon } from '@ncsa/geo-explorer/explore/Sidebar/MapLayers/LegendIcon';
import { MapLayerItem } from '@ncsa/geo-explorer/explore/Sidebar/MapLayers/MapLayerItem';
import { TemporalLayerSummary } from '@ncsa/geo-explorer/explore/Sidebar/MapLayers/TemporalLayerSummary';
import { SidebarSection } from '@ncsa/geo-explorer/explore/Sidebar/SidebarSection';
import { WFSFeatureTable } from '@ncsa/geo-explorer/explore/components/WFSFeatureTable';

export const defaultComponents = {
  SimpleLayerItem,
  WFSFeatureTable,
  DatasetInfo,
  DatasetPreview,
  RippleOverlay,
  RippleEffects,
  MainMap,
  LegendPanel,
  DataInventory,
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
  TemporalLayerSummary,
  LegendIcon,
  MapLayers,
  MapLayerItem,
  BaseMaps,
  Sidebar,
  SidebarSection,
  SelectedFeatures,
};

export type ComponentRegistry = typeof defaultComponents;
