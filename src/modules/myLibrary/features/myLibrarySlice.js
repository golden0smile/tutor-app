import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosTutor } from "services/api";
import {
  ADD_ACTIVITY,
  GET_ACTIVITY_TOPICS,
  MY_LIBRARY_LIST_URL,
  DELETE_ACTIVITY_URL,
} from "constants/apiUrls";
let controller = new AbortController();

const initialState = {
  myLibraryDetails: {
    list: [],
    isLoading: false,
    page: 1,
    searchR: "",
    totalPage: 10,
  },
  activityTopics: {
    isLoading: false,
  },
};

export const getMyLibraryDetails = createAsyncThunk(
  "myLibrary/details",
  async request => {
    if (controller) {
      controller.abort();
      controller = new AbortController();
    }
    const res = await axiosTutor.post(MY_LIBRARY_LIST_URL, request, {
      signal: controller.signal,
    });
    const data = await res.data;
    return data;
  },
);

export const addActivity = createAsyncThunk(
  "myLibrary/add_activity",
  async request => {
    try {
      const res = await axiosTutor.post(ADD_ACTIVITY, request);
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  },
);

export const getActivityTopics = createAsyncThunk(
  "myLibrary/get_activity_topics",
  async request => {
    try {
      const res = await axiosTutor.post(GET_ACTIVITY_TOPICS, request);
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  },
);

export const deleteActivity = createAsyncThunk(
  "myLibrary/deleteActivity",
  async request => {
    try {
      const res = await axiosTutor.post(DELETE_ACTIVITY_URL, request);
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  },
);

export const MyLibrarySlice = createSlice({
  name: "MyLibrary",
  initialState,
  reducers: {
    handleMyLibraryPage: (state, { payload }) => {
      state.myLibraryDetails.page = payload;
    },
    handleMyLibrarySearch: (state, { payload }) => {
      state.myLibraryDetails.page = 1;
      state.searchR = payload;
    },
    handleClearAllFilters: state => {},
  },
  extraReducers: builder => {
    builder.addCase(getMyLibraryDetails.pending, state => {
      state.myLibraryDetails.isLoading = true;
    });
    builder.addCase(getMyLibraryDetails.fulfilled, (state, action) => {
      state.myLibraryDetails.isLoading = false;
      state.myLibraryDetails.list = action.payload.data?.libraryDetails;
    });
    builder.addCase(getMyLibraryDetails.rejected, state => {
      state.myLibraryDetails.isLoading = false;
    });
    // add activity
    builder.addCase(addActivity.pending, state => {
      state.myLibraryDetails.isLoading = true;
    });
    builder.addCase(addActivity.fulfilled, (state, action) => {
      state.myLibraryDetails.isLoading = false;
      state.myLibraryActivity = action.payload?.data;
    });
    builder.addCase(addActivity.rejected, state => {
      state.myLibraryDetails.isLoading = false;
    });
    // get activity topics
    builder.addCase(getActivityTopics.pending, state => {
      state.activityTopics.isLoading = true;
    });
    builder.addCase(getActivityTopics.fulfilled, (state, action) => {
      state.activityTopics.isLoading = false;
      state.activityTopics = action.payload.data?.activityTopics;
    });
    builder.addCase(getActivityTopics.rejected, state => {
      state.activityTopics.isLoading = false;
    });
  },
});

export const {
  tableDataChange,
  handleMyLibrarySearch,
  handleMyLibraryPage,
  handleClearAllFilters,
} = MyLibrarySlice.actions;

export default MyLibrarySlice.reducer;
