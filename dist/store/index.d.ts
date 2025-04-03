export declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    explore: {
        prevIndex: number;
        currentIndex: number;
        dataInventory: import("../utils/types").Dataset[];
        climateInventory: import("../utils/types").Dataset[];
        baseMaps: import("../utils/types").Basemap[];
        selectedDataset: string | null;
        mapLayers: import("./explore/types").MapLayer[];
        selectedLayer: string | null;
        showLayerSettings: boolean;
        selectedBaseMap: string | null;
        selectedFeatures: import("../store/explore/slice").SimpleFeature[];
    };
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        explore: {
            prevIndex: number;
            currentIndex: number;
            dataInventory: import("../utils/types").Dataset[];
            climateInventory: import("../utils/types").Dataset[];
            baseMaps: import("../utils/types").Basemap[];
            selectedDataset: string | null;
            mapLayers: import("./explore/types").MapLayer[];
            selectedLayer: string | null;
            showLayerSettings: boolean;
            selectedBaseMap: string | null;
            selectedFeatures: import("../store/explore/slice").SimpleFeature[];
        };
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
