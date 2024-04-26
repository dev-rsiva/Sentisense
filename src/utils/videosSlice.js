import { createSlice } from "@reduxjs/toolkit";

const videosSlice = createSlice({
  name: "videos",
  initialState: {
    videosInfo: [],
  },
  reducers: {
    addVideos: (state, action) => {
      state.videosInfo.push(action.payload);
    },
  },
});

export const { addVideosInfo } = videosSlice.actions;

export default videosSlice.reducer;
