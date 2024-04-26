import { configureStore } from "@reduxjs/toolkit";
import videosSlice from "./videosSlice";
const appStore = configureStore({
  reducer: {
    videos: videosSlice,
  },
});

export default appStore;
