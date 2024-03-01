import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { Alert } from "react-native";

export const getTopAnime = createAsyncThunk(
  "get-top-anime",
  async (payload, thunkApi) => {
    try {
      const response = await axios.get(`${BASE_URL}/top/anime`);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getAnimeDetail = createAsyncThunk(
  "get-anime-detail",
  async (payload, thunkApi) => {
    try {
      const response = await axios.get(`${BASE_URL}/anime/${payload}`);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const animeSlice = createSlice({
  name: "anime",
  initialState: {
    data: [],
    detail: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTopAnime.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.loading = false;
    });
    builder.addCase(getTopAnime.rejected, (state, action) => {
      Alert.alert(action.payload);
      state.loading = false;
    });
    builder.addCase(getTopAnime.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAnimeDetail.fulfilled, (state, action) => {
      state.detail = action.payload;
      state.loading = false;
    })
    builder.addCase(getAnimeDetail.rejected, (state, action) => {
      Alert.alert(action.payload);
      state.loading = false;
    })
    builder.addCase(getAnimeDetail.pending, (state, action) => {
      state.loading = true;
    });
  },
});

const animeReducer = animeSlice.reducer;
export default animeReducer;
