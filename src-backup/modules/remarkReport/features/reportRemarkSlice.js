import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { REPORTED_QUESTION_LIST } from "constants/apiUrls";
import { axiosTutor } from "services/api";

const initialState = {
  data: [],
  isLoading: false,
};

export const getReportedQuestionList = createAsyncThunk(
  "reportList/data",
  async request => {
    const res = await axiosTutor.get(REPORTED_QUESTION_LIST);
    const data = await res.data;
    return data;
  },
);

export const reportRemarkSlice = createSlice({
  name: "ReportRemark",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getReportedQuestionList.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getReportedQuestionList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getReportedQuestionList.rejected, state => {
      state.isLoading = false;
    });
  },
});

export default reportRemarkSlice.reducer;
