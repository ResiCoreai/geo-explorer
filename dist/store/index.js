import { configureStore } from "@reduxjs/toolkit";
import { exploreSlice } from "../store/explore/slice";
export const store = configureStore({
  reducer: {
    explore: exploreSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
