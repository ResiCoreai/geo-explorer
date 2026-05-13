import { PayloadAction } from '@reduxjs/toolkit';
import { Feature, FeatureCollection, LineString, MultiLineString, MultiPoint, MultiPolygon, Point, Polygon } from 'geojson';
import { MapLayer, MapLayerStyle } from '../../store/explore/types';
import { Basemap, Dataset } from '../../types';
export type SimpleFeature = Feature<Point | LineString | Polygon | MultiPoint | MultiLineString | MultiPolygon>;
export type SimpleFeatureCollection = FeatureCollection<Point | LineString | Polygon | MultiPoint | MultiLineString | MultiPolygon>;
type ExploreState = {
    prevIndex: number;
    currentIndex: number;
    simpleLayerInventory: Dataset[];
    temporalLayerInventory: Dataset[];
    baseMaps: Basemap[];
    selectedDataset: string | null;
    mapLayers: MapLayer[];
    selectedLayer: string | null;
    sidebarOpen: boolean;
    showStyleSettings: boolean;
    showLayerSettings: boolean;
    layerSettingsExpanded: boolean;
    selectedBaseMap: string | null;
    selectedFeatures: SimpleFeature[];
    initializing: boolean;
};
export declare const defaultLayerStyle: MapLayerStyle;
export declare const exploreSlice: import("@reduxjs/toolkit").Slice<ExploreState, {
    selectDataset(state: import("immer").WritableDraft<ExploreState>, action: PayloadAction<{
        layer_id: string | null;
    }>): void;
    selectMapLayer(state: import("immer").WritableDraft<ExploreState>, action: PayloadAction<{
        layer_id: string | null;
    }>): void;
    setSidebarOpen(state: import("immer").WritableDraft<ExploreState>, action: PayloadAction<{
        open: boolean;
    }>): void;
    toggleLayerSettings(state: import("immer").WritableDraft<ExploreState>): void;
    setShowLayerSettings(state: import("immer").WritableDraft<ExploreState>, action: PayloadAction<{
        show: boolean;
    }>): void;
    setLayerSettingsExpanded(state: import("immer").WritableDraft<ExploreState>, action: PayloadAction<{
        expanded: boolean;
    }>): void;
    setShowStyleSettings(state: import("immer").WritableDraft<ExploreState>, action: PayloadAction<{
        show: boolean;
    }>): void;
    selectBaseMap(state: import("immer").WritableDraft<ExploreState>, action: PayloadAction<{
        layer_id: string | null;
    }>): void;
    reorderStart: (state: import("immer").WritableDraft<ExploreState>, action: PayloadAction<{
        index: number;
    }>) => void;
    reorderEnd: (state: import("immer").WritableDraft<ExploreState>) => void;
    moveLayer(state: import("immer").WritableDraft<ExploreState>, action: PayloadAction<{
        fromIndex: number;
        toIndex: number;
    }>): void;
    setCurrentIndex(state: import("immer").WritableDraft<ExploreState>, action: PayloadAction<{
        index: number;
    }>): void;
    toggleVisibility(state: import("immer").WritableDraft<ExploreState>, action: PayloadAction<{
        layer_id: string;
    }>): void;
    setMapLayers(state: import("immer").WritableDraft<ExploreState>, action: PayloadAction<{
        layers: MapLayer[];
    }>): void;
    addLayer(state: import("immer").WritableDraft<ExploreState>, action: PayloadAction<{
        layer_id: string;
    }>): void;
    removeLayer(state: import("immer").WritableDraft<ExploreState>, action: PayloadAction<{
        layer_id: string;
    }>): void;
    togglePlaying(state: import("immer").WritableDraft<ExploreState>, action: PayloadAction<{
        layer_id: string;
    }>): void;
    setTimestampIdx(state: import("immer").WritableDraft<ExploreState>, action: PayloadAction<{
        layer_id: string;
        index: number;
    }>): void;
    setSelectedFeatures(state: import("immer").WritableDraft<ExploreState>, action: PayloadAction<SimpleFeature[]>): void;
    setLayerStyleName(state: import("immer").WritableDraft<ExploreState>, action: PayloadAction<{
        layer_id: string;
        style_name: string;
    }>): void;
    setLayerStyle(state: import("immer").WritableDraft<ExploreState>, action: PayloadAction<{
        layer_id: string;
        style: MapLayerStyle;
        styleSLD: string;
    }>): void;
    resetLayerStyle(state: import("immer").WritableDraft<ExploreState>, action: PayloadAction<{
        layer_id: string;
    }>): void;
    setLayerInventory(state: import("immer").WritableDraft<ExploreState>, action: PayloadAction<{
        simpleLayerInventory: Dataset[];
        temporalLayerInventory: Dataset[];
        baseMaps: Basemap[];
    }>): void;
    setInitializing(state: import("immer").WritableDraft<ExploreState>, action: PayloadAction<{
        initializing: boolean;
    }>): void;
}, "mapLayers", "mapLayers", import("@reduxjs/toolkit").SliceSelectors<ExploreState>>;
export declare const selectDataset: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    layer_id: string | null;
}, "mapLayers/selectDataset">, selectMapLayer: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    layer_id: string | null;
}, "mapLayers/selectMapLayer">, setSidebarOpen: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    open: boolean;
}, "mapLayers/setSidebarOpen">, toggleLayerSettings: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"mapLayers/toggleLayerSettings">, setShowLayerSettings: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    show: boolean;
}, "mapLayers/setShowLayerSettings">, setShowStyleSettings: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    show: boolean;
}, "mapLayers/setShowStyleSettings">, setLayerSettingsExpanded: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    expanded: boolean;
}, "mapLayers/setLayerSettingsExpanded">, selectBaseMap: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    layer_id: string | null;
}, "mapLayers/selectBaseMap">, setMapLayers: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    layers: MapLayer[];
}, "mapLayers/setMapLayers">, addLayer: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    layer_id: string;
}, "mapLayers/addLayer">, removeLayer: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    layer_id: string;
}, "mapLayers/removeLayer">, moveLayer: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    fromIndex: number;
    toIndex: number;
}, "mapLayers/moveLayer">, reorderStart: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    index: number;
}, "mapLayers/reorderStart">, reorderEnd: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"mapLayers/reorderEnd">, setCurrentIndex: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    index: number;
}, "mapLayers/setCurrentIndex">, toggleVisibility: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    layer_id: string;
}, "mapLayers/toggleVisibility">, togglePlaying: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    layer_id: string;
}, "mapLayers/togglePlaying">, setTimestampIdx: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    layer_id: string;
    index: number;
}, "mapLayers/setTimestampIdx">, setSelectedFeatures: import("@reduxjs/toolkit").ActionCreatorWithPayload<SimpleFeature[], "mapLayers/setSelectedFeatures">, setLayerStyleName: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    layer_id: string;
    style_name: string;
}, "mapLayers/setLayerStyleName">, setLayerStyle: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    layer_id: string;
    style: MapLayerStyle;
    styleSLD: string;
}, "mapLayers/setLayerStyle">, resetLayerStyle: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    layer_id: string;
}, "mapLayers/resetLayerStyle">, setLayerInventory: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    simpleLayerInventory: Dataset[];
    temporalLayerInventory: Dataset[];
    baseMaps: Basemap[];
}, "mapLayers/setLayerInventory">, setInitializing: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    initializing: boolean;
}, "mapLayers/setInitializing">;
export {};
