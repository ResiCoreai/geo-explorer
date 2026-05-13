import { createSlice } from '@reduxjs/toolkit';
export const defaultLayerStyle = {
    radius: 8,
    strokeWidth: 2,
    strokeColor: '#000000',
    strokeOpacity: 1,
    fillColor: '#000000',
    fillOpacity: 0.2,
    layerOpacity: 1,
};
function moveMapLayer(mapLayers, fromIndex, toIndex) {
    if (fromIndex >= 0 &&
        fromIndex <= mapLayers.length &&
        toIndex >= 0 &&
        toIndex <= mapLayers.length &&
        fromIndex !== toIndex) {
        if (toIndex < fromIndex) {
            return [
                ...mapLayers.slice(0, toIndex),
                mapLayers[fromIndex],
                ...mapLayers.slice(toIndex, fromIndex),
                ...mapLayers.slice(fromIndex + 1),
            ];
        }
        else {
            return [
                ...mapLayers.slice(0, fromIndex),
                ...mapLayers.slice(fromIndex + 1, toIndex),
                mapLayers[fromIndex],
                ...mapLayers.slice(toIndex),
            ];
        }
    }
    else {
        return mapLayers;
    }
}
export const exploreSlice = createSlice({
    name: 'mapLayers',
    initialState: {
        prevIndex: -1,
        currentIndex: -1,
        simpleLayerInventory: [],
        temporalLayerInventory: [],
        baseMaps: [],
        selectedDataset: null,
        mapLayers: [],
        selectedLayer: null,
        sidebarOpen: true,
        showStyleSettings: false,
        showLayerSettings: false,
        layerSettingsExpanded: false,
        selectedBaseMap: null,
        selectedFeatures: [],
        initializing: false,
    },
    reducers: {
        selectDataset(state, action) {
            if (action.payload.layer_id == null) {
                state.selectedDataset = null;
            }
            else {
                const dataset = state.simpleLayerInventory.find((l) => l.layer_id === action.payload.layer_id) ||
                    state.temporalLayerInventory.find((l) => l.layer_id === action.payload.layer_id);
                if (dataset) {
                    state.selectedDataset = dataset.layer_id;
                }
            }
        },
        selectMapLayer(state, action) {
            if (action.payload.layer_id == null) {
                state.selectedLayer = null;
            }
            else {
                const layer = state.mapLayers.find((l) => l.data.layer_id === action.payload.layer_id);
                if (layer) {
                    state.selectedLayer = layer.data.layer_id;
                    state.showLayerSettings = false;
                    state.showStyleSettings = false;
                }
            }
            state.selectedFeatures = [];
        },
        setSidebarOpen(state, action) {
            state.sidebarOpen = action.payload.open;
        },
        toggleLayerSettings(state) {
            state.showLayerSettings = !state.showLayerSettings;
        },
        setShowLayerSettings(state, action) {
            state.showLayerSettings = action.payload.show;
        },
        setLayerSettingsExpanded(state, action) {
            state.layerSettingsExpanded = action.payload.expanded;
        },
        setShowStyleSettings(state, action) {
            state.showStyleSettings = action.payload.show;
        },
        selectBaseMap(state, action) {
            if (action.payload.layer_id == null) {
                state.selectedBaseMap = null;
            }
            else {
                state.selectedBaseMap = action.payload.layer_id;
            }
        },
        reorderStart: (state, action) => {
            state.prevIndex = action.payload.index;
        },
        reorderEnd: (state) => {
            const { currentIndex, prevIndex, mapLayers } = state;
            state.mapLayers = moveMapLayer(mapLayers, prevIndex, currentIndex);
            state.prevIndex = -1;
            state.currentIndex = -1;
        },
        moveLayer(state, action) {
            state.mapLayers = moveMapLayer(state.mapLayers, action.payload.fromIndex, action.payload.toIndex);
        },
        setCurrentIndex(state, action) {
            state.currentIndex = action.payload.index;
            state.prevIndex;
        },
        toggleVisibility(state, action) {
            const layer = state.mapLayers.find((l) => l.data.layer_id === action.payload.layer_id);
            if (!layer)
                return;
            layer.visible = !layer.visible;
            if (state.selectedLayer === action.payload.layer_id && !layer.visible) {
                state.selectedFeatures = [];
            }
        },
        setMapLayers(state, action) {
            state.mapLayers = action.payload.layers;
        },
        addLayer(state, action) {
            var _a;
            const dataset = state.simpleLayerInventory.find((l) => l.layer_id === action.payload.layer_id) ||
                state.temporalLayerInventory.find((l) => l.layer_id === action.payload.layer_id);
            if (!dataset)
                return;
            if (state.mapLayers.some((layer) => layer.data.layer_id === dataset.layer_id))
                return;
            state.mapLayers.unshift({
                data: dataset,
                playing: false,
                timestampIdx: 0,
                visible: true,
                version: 0,
                style_name: (_a = dataset.default_style_name) !== null && _a !== void 0 ? _a : '',
                style: defaultLayerStyle,
                styleSLD: '',
            });
            state.selectedFeatures = [];
        },
        removeLayer(state, action) {
            state.mapLayers = state.mapLayers.filter((l) => l.data.layer_id !== action.payload.layer_id);
            if (state.selectedLayer === action.payload.layer_id) {
                state.selectedLayer = null;
                state.showLayerSettings = false;
                state.showStyleSettings = false;
                state.selectedFeatures = [];
            }
        },
        togglePlaying(state, action) {
            const layer = state.mapLayers.find((l) => l.data.layer_id === action.payload.layer_id);
            if (layer) {
                layer.playing = !layer.playing;
            }
        },
        setTimestampIdx(state, action) {
            const layer = state.mapLayers.find((layer) => layer.data.layer_id === action.payload.layer_id);
            if (layer) {
                layer.timestampIdx = action.payload.index;
            }
        },
        setSelectedFeatures(state, action) {
            state.selectedFeatures = action.payload;
        },
        setLayerStyleName(state, action) {
            const layer = state.mapLayers.find((layer) => layer.data.layer_id === action.payload.layer_id);
            if (layer) {
                layer.version++;
                layer.style_name = action.payload.style_name;
            }
        },
        setLayerStyle(state, action) {
            const layer = state.mapLayers.find((layer) => layer.data.layer_id === action.payload.layer_id);
            if (layer) {
                layer.version++;
                layer.style = action.payload.style;
                layer.styleSLD = action.payload.styleSLD;
            }
        },
        resetLayerStyle(state, action) {
            const layer = state.mapLayers.find((layer) => layer.data.layer_id === action.payload.layer_id);
            if (layer) {
                layer.version = 0;
                layer.style = defaultLayerStyle;
                layer.styleSLD = '';
            }
        },
        setLayerInventory(state, action) {
            state.simpleLayerInventory = action.payload.simpleLayerInventory;
            state.temporalLayerInventory = action.payload.temporalLayerInventory;
            state.baseMaps = action.payload.baseMaps;
            state.mapLayers = [];
        },
        setInitializing(state, action) {
            state.initializing = action.payload.initializing;
        },
    },
});
export const { selectDataset, selectMapLayer, setSidebarOpen, toggleLayerSettings, setShowLayerSettings, setShowStyleSettings, setLayerSettingsExpanded, selectBaseMap, setMapLayers, addLayer, removeLayer, moveLayer, reorderStart, reorderEnd, setCurrentIndex, toggleVisibility, togglePlaying, setTimestampIdx, setSelectedFeatures, setLayerStyleName, setLayerStyle, resetLayerStyle, setLayerInventory, setInitializing, } = exploreSlice.actions;
//# sourceMappingURL=slice.js.map