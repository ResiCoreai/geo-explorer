import { Action, configureStore } from '@reduxjs/toolkit';
import { createContext } from 'react';
import {
  ReactReduxContextValue,
  createDispatchHook,
  createSelectorHook,
  createStoreHook,
} from 'react-redux';

import { exploreSlice } from '@ncsa/geo-explorer/store/explore/slice';

export const store = configureStore({
  reducer: {
    explore: exploreSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const GeoExplorerReduxContext = createContext<ReactReduxContextValue<
  unknown,
  Action
> | null>(null);

export const useStore = createStoreHook(GeoExplorerReduxContext);
export const useSelector = createSelectorHook(GeoExplorerReduxContext);
export const useDispatch = createDispatchHook(GeoExplorerReduxContext);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
