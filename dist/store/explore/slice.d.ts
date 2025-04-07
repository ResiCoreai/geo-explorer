import { PayloadAction } from '@reduxjs/toolkit';
import {
  Feature,
  FeatureCollection,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
} from 'geojson';

import { MapLayer, MapLayerStyle } from '../../store/explore/types';
import { Basemap, Dataset } from '../../utils/types';

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
export declare const defaultLayerStyle: MapLayerStyle;
export declare const initialize: import('@reduxjs/toolkit').AsyncThunk<
  import('../../utils/types').Metadata,
  void,
  {
    state?: unknown;
    dispatch?: import('redux-thunk').ThunkDispatch<
      unknown,
      unknown,
      import('redux').UnknownAction
    >;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
  }
>;
export declare const exploreSlice: import('@reduxjs/toolkit').Slice<
  ExploreState,
  {
    selectDataset(
      state: import('immer').WritableDraft<ExploreState>,
      action: PayloadAction<{
        layer_id: string | null;
      }>,
    ): void;
    selectMapLayer(
      state: import('immer').WritableDraft<ExploreState>,
      action: PayloadAction<{
        layer_id: string | null;
      }>,
    ): void;
    toggleLayerSettings(
      state: import('immer').WritableDraft<ExploreState>,
    ): void;
    setShowLayerSettings(
      state: import('immer').WritableDraft<ExploreState>,
      action: PayloadAction<{
        show: boolean;
      }>,
    ): void;
    selectBaseMap(
      state: import('immer').WritableDraft<ExploreState>,
      action: PayloadAction<{
        layer_id: string | null;
      }>,
    ): void;
    reorderStart: (
      state: import('immer').WritableDraft<ExploreState>,
      action: PayloadAction<{
        index: number;
      }>,
    ) => void;
    reorderEnd: (state: import('immer').WritableDraft<ExploreState>) => void;
    setCurrentIndex(
      state: import('immer').WritableDraft<ExploreState>,
      action: PayloadAction<{
        index: number;
      }>,
    ): void;
    toggleVisibility(
      state: import('immer').WritableDraft<ExploreState>,
      action: PayloadAction<{
        layer_id: string;
      }>,
    ): void;
    addLayer(
      state: import('immer').WritableDraft<ExploreState>,
      action: PayloadAction<{
        layer_id: string;
      }>,
    ): void;
    removeLayer(
      state: import('immer').WritableDraft<ExploreState>,
      action: PayloadAction<{
        layer_id: string;
      }>,
    ): void;
    togglePlaying(
      state: import('immer').WritableDraft<ExploreState>,
      action: PayloadAction<{
        layer_id: string;
      }>,
    ): void;
    setTimestampIdx(
      state: import('immer').WritableDraft<ExploreState>,
      action: PayloadAction<{
        layer_id: string;
        index: number;
      }>,
    ): void;
    setSelectedFeatures(
      state: import('immer').WritableDraft<ExploreState>,
      action: PayloadAction<SimpleFeature[]>,
    ): void;
    setLayerStyle(
      state: import('immer').WritableDraft<ExploreState>,
      action: PayloadAction<{
        layer_id: string;
        style: MapLayerStyle;
        styleSLD: string;
      }>,
    ): void;
    resetLayerStyle(
      state: import('immer').WritableDraft<ExploreState>,
      action: PayloadAction<{
        layer_id: string;
      }>,
    ): void;
  },
  'mapLayers',
  'mapLayers',
  import('@reduxjs/toolkit').SliceSelectors<ExploreState>
>;
export declare const selectDataset: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      layer_id: string | null;
    },
    'mapLayers/selectDataset'
  >,
  selectMapLayer: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      layer_id: string | null;
    },
    'mapLayers/selectMapLayer'
  >,
  toggleLayerSettings: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'mapLayers/toggleLayerSettings'>,
  setShowLayerSettings: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      show: boolean;
    },
    'mapLayers/setShowLayerSettings'
  >,
  selectBaseMap: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      layer_id: string | null;
    },
    'mapLayers/selectBaseMap'
  >,
  addLayer: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      layer_id: string;
    },
    'mapLayers/addLayer'
  >,
  removeLayer: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      layer_id: string;
    },
    'mapLayers/removeLayer'
  >,
  reorderStart: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      index: number;
    },
    'mapLayers/reorderStart'
  >,
  reorderEnd: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'mapLayers/reorderEnd'>,
  setCurrentIndex: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      index: number;
    },
    'mapLayers/setCurrentIndex'
  >,
  toggleVisibility: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      layer_id: string;
    },
    'mapLayers/toggleVisibility'
  >,
  togglePlaying: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      layer_id: string;
    },
    'mapLayers/togglePlaying'
  >,
  setTimestampIdx: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      layer_id: string;
      index: number;
    },
    'mapLayers/setTimestampIdx'
  >,
  setSelectedFeatures: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    SimpleFeature[],
    'mapLayers/setSelectedFeatures'
  >,
  setLayerStyle: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      layer_id: string;
      style: MapLayerStyle;
      styleSLD: string;
    },
    'mapLayers/setLayerStyle'
  >,
  resetLayerStyle: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      layer_id: string;
    },
    'mapLayers/resetLayerStyle'
  >;
export {};
