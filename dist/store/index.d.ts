import { Action } from '@reduxjs/toolkit';
import { ReactReduxContextValue } from 'react-redux';
export declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    explore: {
        prevIndex: number;
        currentIndex: number;
        simpleLayerInventory: import("../types").Dataset[];
        temporalLayerInventory: import("../types").Dataset[];
        baseMaps: import("../types").Basemap[];
        selectedDataset: string | null;
        mapLayers: import("./explore/types").MapLayer[];
        selectedLayer: string | null;
        sidebarOpen: boolean;
        showStyleSettings: boolean;
        showLayerSettings: boolean;
        layerSettingsExpanded: boolean;
        selectedBaseMap: string | null;
        selectedFeatures: import("../store/explore/slice").SimpleFeature[];
        initializing: boolean;
    };
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        explore: {
            prevIndex: number;
            currentIndex: number;
            simpleLayerInventory: import("../types").Dataset[];
            temporalLayerInventory: import("../types").Dataset[];
            baseMaps: import("../types").Basemap[];
            selectedDataset: string | null;
            mapLayers: import("./explore/types").MapLayer[];
            selectedLayer: string | null;
            sidebarOpen: boolean;
            showStyleSettings: boolean;
            showLayerSettings: boolean;
            layerSettingsExpanded: boolean;
            selectedBaseMap: string | null;
            selectedFeatures: import("../store/explore/slice").SimpleFeature[];
            initializing: boolean;
        };
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export declare const GeoExplorerReduxContext: import("react").Context<ReactReduxContextValue<unknown, Action> | null>;
export declare const useStore: import("react-redux").UseStore<import("redux").Store<unknown, Action, {}>>;
export declare const useSelector: import("react-redux").UseSelector<unknown>;
export declare const useDispatch: import("react-redux").UseDispatch<import("redux").Dispatch<Action>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
