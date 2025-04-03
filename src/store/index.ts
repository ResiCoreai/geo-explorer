import { configureStore } from '@reduxjs/toolkit';

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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
