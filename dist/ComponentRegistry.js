import { DatasetPreview } from './explore/DatasetPreview';
import { DatasetInfo } from './explore/DatasetPreview/DatasetInfo';
import { MainMap } from './explore/MainMap';
import { LegendPanel } from './explore/MainMap/LegendPanel';
import { RippleEffects } from './explore/MainMap/RippleOverlay/RippleEffects';
import { RippleOverlay } from './explore/MainMap/RippleOverlay/RippleOverlay';
import { WMSLayer } from './explore/MainMap/WMSLayer';
import { WMSLayerSimple } from './explore/MainMap/WMSLayerSimple';
import { WMSLayerTemporal } from './explore/MainMap/WMSLayerTemporal';
import { MapLayerSettings } from './explore/MapLayerSettings';
import { Header } from './explore/MapLayerSettings/Header';
import { StyleSettings } from './explore/MapLayerSettings/StyleSettings';
import { ColorInput } from './explore/MapLayerSettings/StyleSettings/ColorInput';
import { NumberInput } from './explore/MapLayerSettings/StyleSettings/NumberInput';
import { TimeSelector } from './explore/MapLayerSettings/TimeSelector';
import { SelectedFeatures } from './explore/SelectedFeatures';
import { Sidebar } from './explore/Sidebar';
import { BaseMaps } from './explore/Sidebar/BaseMaps';
import { DataInventory } from './explore/Sidebar/DataInventory';
import { SimpleLayerItem } from './explore/Sidebar/DataInventory/SimpleLayerItem';
import { SimpleLayerList } from './explore/Sidebar/DataInventory/SimpleLayerList';
import { TemporalLayerItem } from './explore/Sidebar/DataInventory/TemporalLayerItem';
import { TemporalLayerList } from './explore/Sidebar/DataInventory/TemporalLayerList';
import { MapLayers } from './explore/Sidebar/MapLayers';
import { LegendIcon } from './explore/Sidebar/MapLayers/LegendIcon';
import { MapLayerItem } from './explore/Sidebar/MapLayers/MapLayerItem';
import { TemporalLayerSummary } from './explore/Sidebar/MapLayers/TemporalLayerSummary';
import { SidebarSection } from './explore/Sidebar/SidebarSection';
import { StyleEditor } from './explore/Sidebar/StyleEditor';
import { WFSFeatureTable } from './explore/components/WFSFeatureTable';
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
    StyleEditor,
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
//# sourceMappingURL=ComponentRegistry.js.map