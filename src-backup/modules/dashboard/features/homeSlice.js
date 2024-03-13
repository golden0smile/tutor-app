import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  SESSION_COUNT_URL,
  GLOBAL_REMARK_REPORT_COUNT_URL,
} from "constants/apiUrls";
import { axiosTutor } from "services/api";

const initialState = {
  count: [],
  isLoading: false,
  remarkReportCount: 0,
};

export const getSessionCount = createAsyncThunk(
  "Session/count",
  async request => {
    const res = await axiosTutor.get(SESSION_COUNT_URL);
    const data = await res.data;
    return data;
  },
);

export const getRemarkReportCount = createAsyncThunk(
  "Global/reportCount",
  async request => {
    const res = await axiosTutor.get(GLOBAL_REMARK_REPORT_COUNT_URL);
    const data = await res.data;
    return data;
  },
);

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSessionCount.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getSessionCount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.count = action.payload.data;
    });
    builder.addCase(getSessionCount.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(getRemarkReportCount.fulfilled, (state, action) => {
      state.remarkReportCount = action.payload.data?.reportCounts;
    });
  },
});

export default homeSlice.reducer;
