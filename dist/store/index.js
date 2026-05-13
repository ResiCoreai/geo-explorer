import { configureStore } from '@reduxjs/toolkit';
import { createContext } from 'react';
import { createDispatchHook, createSelectorHook, createStoreHook, } from 'react-redux';
import { exploreSlice } from '../store/explore/slice';
export const store = configureStore({
    reducer: {
        explore: exploreSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});
export const GeoExplorerReduxContext = createContext(null);
export const useStore = createStoreHook(GeoExplorerReduxContext);
export const useSelector = createSelectorHook(GeoExplorerReduxContext);
export const useDispatch = createDispatchHook(GeoExplorerReduxContext);
//# sourceMappingURL=index.js.map