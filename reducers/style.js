import { createSlice } from "@reduxjs/toolkit";
import { StyleSheet } from "react-native";

const styleSlice = createSlice({
  name: "global-style",
  initialState: {
    globalStyle: StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "pink",
      },
      text: {
        fontSize: 45
    }
    }),
  },
  reducers: {},
});

const styleReducer = styleSlice.reducer;
export default styleReducer;
