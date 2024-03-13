import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosTutor } from "services/api";
import { GET_TIME_SHEET_DETAILS_URL } from "constants/apiUrls";
let controller = new AbortController();

const initialState = {
  timeSheetDetails: [],
  isLoading: false,
  page: 1,
  sizePerPage: 5,
  totalPage: 0,
  totalCount: 0,
  sortOrder: "desc",
  sortField: "ses_date",
  paymentStatusFilterR: "",
  dateFilterR: "",
};

export const getTimeSheetDetails = createAsyncThunk(
  "timeSheet/details",
  async request => {
    if (controller) {
      controller.abort();
      controller = new AbortController();
    }
    const res = await axiosTutor.post(GET_TIME_SHEET_DETAILS_URL, request, {
      signal: controller.signal,
    });
    const data = await res.data;
    return data;
  },
);

export const TimeSheetSlice = createSlice({
  name: "TimeSheet",
  initialState,
  reducers: {
    handleSort: (state, { payload }) => {
      state.sortField = payload.field;
      state.sortOrder = payload.order;
    },
    handleTimeSheetSortField: (state, { payload }) => {
      state.sortField = payload;
    },
    handleTimeSheetSortOrder: (state, { payload }) => {
      state.sortOrder = payload;
    },
    handleTimeSheetPaymentStatusFilter: (state, { payload }) => {
      state.page = 1;
      state.paymentStatusFilterR = payload;
    },
    handleTimeSheetDateFilter: (state, { payload }) => {
      state.page = 1;
      state.dateFilterR = payload;
    },
    handleTimeSheetPage: (state, { payload }) => {
      state.page = payload;
    },
    handleTimeSheetSizePerPage: (state, { payload }) => {
      state.page = 1;
      state.sizePerPage = payload;
    },
    handleClearAllFilters: state => {
      state.dateFilterR = "";
      state.paymentStatusFilterR = "";
    },
  },
  extraReducers: builder => {
    builder.addCase(getTimeSheetDetails.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getTimeSheetDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.timeSheetDetails = action.payload.data;
      state.totalCount = action.payload.data?.count;
      state.totalPage = Math.ceil(
        action.payload.data?.count / state.sizePerPage,
      );
    });
    builder.addCase(getTimeSheetDetails.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const {
  tableDataChange,
  handleSort,
  handleTimeSheetSortField,
  handleTimeSheetSortOrder,
  handleTimeSheetPaymentStatusFilter,
  handleTimeSheetDateFilter,
  handleTimeSheetPage,
  handleTimeSheetSizePerPage,
  handleClearAllFilters,
} = TimeSheetSlice.actions;

export default TimeSheetSlice.reducer;
