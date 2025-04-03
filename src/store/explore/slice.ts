import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  Feature,
  FeatureCollection,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
} from "geojson";

import { MapLayer, MapLayerStyle } from "@ncsa/geo-explorer/store/explore/types";
import { getInitialSettings } from "@ncsa/geo-explorer/utils/geoserver";
import { Basemap, Dataset } from "@ncsa/geo-explorer/utils/types";

export type SimpleFeature = Feature<
  Point | LineString | Polygon | MultiPoint | MultiLineString | MultiPolygon
>;

export type SimpleFeatureCollection = FeatureCollection<
  Point | LineString | Polygon | MultiPoint | MultiLineString | MultiPolygon
>;

type ExploreState = {
  prevIndex: number;
  currentIndex: number;
  dataInventory: Dataset[];
  climateInventory: Dataset[];
  baseMaps: Basemap[];
  selectedDataset: string | null;
  mapLayers: MapLayer[];
  selectedLayer: string | null;
  showLayerSettings: boolean;
  selectedBaseMap: string | null;
  selectedFeatures: SimpleFeature[];
};

export const defaultLayerStyle: MapLayerStyle = {
  radius: 8,
  strokeWidth: 2,
  strokeColor: "#000000",
  strokeOpacity: 1,
  fillColor: "#000000",
  fillOpacity: 0.2,
  layerOpacity: 1,
};

export const initialize = createAsyncThunk(
  "explore/initialize",
  getInitialSettings,
);

export const exploreSlice = createSlice({
  name: "mapLayers",
  initialState: {
    prevIndex: -1,
    currentIndex: -1,
    dataInventory: [],
    climateInventory: [],
    baseMaps: [],
    selectedDataset: null,
    mapLayers: [],
    selectedLayer: null,
    showLayerSettings: false,
    selectedBaseMap: null,
    selectedFeatures: [],
  } as ExploreState,
  reducers: {
    selectDataset(state, action: PayloadAction<{ layer_id: string | null }>) {
      if (action.payload.layer_id == null) {
        state.selectedDataset = null;
      } else {
        const dataset =
          state.dataInventory.find(
            (l) => l.layer_id === action.payload.layer_id,
          ) ||
          state.climateInventory.find(
            (l) => l.layer_id === action.payload.layer_id,
          );

        if (dataset) {
          state.selectedDataset = dataset.layer_id;
        }
      }
    },
    selectMapLayer(state, action: PayloadAction<{ layer_id: string | null }>) {
      if (action.payload.layer_id == null) {
        state.selectedLayer = null;
      } else {
        const layer = state.mapLayers.find(
          (l) => l.data.layer_id === action.payload.layer_id,
        );
        if (layer) {
          state.selectedLayer = layer.data.layer_id;
          state.showLayerSettings = false;
        }
      }
      state.selectedFeatures = [];
    },
    toggleLayerSettings(state) {
      state.showLayerSettings = !state.showLayerSettings;
    },
    setShowLayerSettings(state, action: PayloadAction<{ show: boolean }>) {
      state.showLayerSettings = action.payload.show;
    },
    selectBaseMap(state, action: PayloadAction<{ layer_id: string | null }>) {
      if (action.payload.layer_id == null) {
        state.selectedBaseMap = null;
      } else {
        state.selectedBaseMap = action.payload.layer_id;
      }
    },
    reorderStart: (state, action: PayloadAction<{ index: number }>) => {
      state.prevIndex = action.payload.index;
    },
    reorderEnd: (state) => {
      const { currentIndex, prevIndex, mapLayers } = state;
      if (
        prevIndex >= 0 &&
        prevIndex <= mapLayers.length &&
        currentIndex >= 0 &&
        currentIndex <= mapLayers.length &&
        prevIndex !== currentIndex
      ) {
        if (currentIndex < prevIndex) {
          state.mapLayers = [
            ...mapLayers.slice(0, currentIndex),
            mapLayers[prevIndex]!,
            ...mapLayers.slice(currentIndex, prevIndex),
            ...mapLayers.slice(prevIndex + 1),
          ];
        } else {
          state.mapLayers = [
            ...mapLayers.slice(0, prevIndex),
            ...mapLayers.slice(prevIndex + 1, currentIndex),
            mapLayers[prevIndex]!,
            ...mapLayers.slice(currentIndex),
          ];
        }
      }
      state.prevIndex = -1;
      state.currentIndex = -1;
    },
    setCurrentIndex(state, action: PayloadAction<{ index: number }>) {
      state.currentIndex = action.payload.index;
      state.prevIndex;
    },
    toggleVisibility(state, action: PayloadAction<{ layer_id: string }>) {
      const layer = state.mapLayers.find(
        (l) => l.data.layer_id === action.payload.layer_id,
      );
      if (layer) {
        layer.visible = !layer.visible;
      }
    },
    addLayer(state, action: PayloadAction<{ layer_id: string }>) {
      const dataset =
        state.dataInventory.find(
          (l) => l.layer_id === action.payload.layer_id,
        ) ||
        state.climateInventory.find(
          (l) => l.layer_id === action.payload.layer_id,
        );

      if (!dataset) return;
      if (
        state.mapLayers.some(
          (layer) => layer.data.layer_id === dataset.layer_id,
        )
      )
        return;
      state.mapLayers.unshift({
        data: dataset,
        playing: false,
        timestampIdx: 0,
        visible: true,
        version: 0,
        style: defaultLayerStyle,
        styleSLD: "",
      });
      state.selectedFeatures = [];
    },
    removeLayer(state, action: PayloadAction<{ layer_id: string }>) {
      state.mapLayers = state.mapLayers.filter(
        (l) => l.data.layer_id !== action.payload.layer_id,
      );
      if (state.selectedLayer === action.payload.layer_id) {
        state.selectedLayer = null;
        state.showLayerSettings = false;
      }
      state.selectedFeatures = [];
    },
    togglePlaying(state, action: PayloadAction<{ layer_id: string }>) {
      const layer = state.mapLayers.find(
        (l) => l.data.layer_id === action.payload.layer_id,
      );
      if (layer) {
        layer.playing = !layer.playing;
      }
    },
    setTimestampIdx(
      state,
      action: PayloadAction<{ layer_id: string; index: number }>,
    ) {
      const layer = state.mapLayers.find(
        (layer) => layer.data.layer_id === action.payload.layer_id,
      );
      if (layer) {
        layer.timestampIdx = action.payload.index;
      }
    },
    setSelectedFeatures(state, action: PayloadAction<SimpleFeature[]>) {
      state.selectedFeatures = action.payload;
    },
    setLayerStyle(
      state,
      action: PayloadAction<{
        layer_id: string;
        style: MapLayerStyle;
        styleSLD: string;
      }>,
    ) {
      const layer = state.mapLayers.find(
        (layer) => layer.data.layer_id === action.payload.layer_id,
      );
      if (layer) {
        layer.version++;
        layer.style = action.payload.style;
        layer.styleSLD = action.payload.styleSLD;
      }
    },
    resetLayerStyle(state, action: PayloadAction<{ layer_id: string }>) {
      const layer = state.mapLayers.find(
        (layer) => layer.data.layer_id === action.payload.layer_id,
      );
      if (layer) {
        layer.version = 0;
        layer.style = defaultLayerStyle;
        layer.styleSLD = "";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initialize.fulfilled, (state, action) => {
      state.dataInventory = action.payload.tech_requirement_layers;
      state.climateInventory = action.payload.climate_layers;
      state.baseMaps = action.payload.basemaps;
    });
  },
});

export const {
  selectDataset,
  selectMapLayer,
  toggleLayerSettings,
  setShowLayerSettings,
  selectBaseMap,
  addLayer,
  removeLayer,
  reorderStart,
  reorderEnd,
  setCurrentIndex,
  toggleVisibility,
  togglePlaying,
  setTimestampIdx,
  setSelectedFeatures,
  setLayerStyle,
  resetLayerStyle,
} = exploreSlice.actions;
