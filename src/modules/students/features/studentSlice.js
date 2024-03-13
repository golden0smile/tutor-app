import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  GET_ALL_SCHOOL_AND_LEVEL_DETAILS_URL,
  GET_STUDENT_DETAILS_URL,
} from "constants/apiUrls";
import { axiosTutor } from "services/api";

const initialState = {
  StudentsDetails: [],
  isLoading: false,
  page: 1,
  totalCounts: 0,
  sizePerPage: 5,
  totalPage: 0,
  sortOrder: "desc",
  sortField: "pk_student_id",
  searchR: "",
  schoolFilterR: "",
  unPlannedLesson: false,
  levelFilterR: "",
};

//getting Student details
export const getStudentAllDetail = createAsyncThunk(
  "Student/details",
  async request => {
    const res = await axiosTutor.post(GET_STUDENT_DETAILS_URL, request);
    const data = await res.data;
    return data;
  },
);

//getSchool

export const getSchoolDetail = createAsyncThunk(
  "Student/school",
  async request => {
    const res = await axiosTutor.get(
      GET_ALL_SCHOOL_AND_LEVEL_DETAILS_URL,
      request,
    );
    const data = await res.data;
    return data;
  },
);

export const StudentSlice = createSlice({
  name: "Students",
  initialState,
  reducers: {
    handleSort: (state, { payload }) => {
      state.sortField = payload.field;
      state.sortOrder = payload.order;
    },
    handleStudentSearch: (state, { payload }) => {
      state.searchR = payload;
    },
    handleStudentSortField: (state, { payload }) => {
      state.sortField = payload;
    },
    handleStudentSortOrder: (state, { payload }) => {
      state.sortOrder = payload;
    },

    handleStudentLevelFilter: (state, { payload }) => {
      state.levelFilterR = payload;
    },
    handleStudentSchoolFilter: (state, { payload }) => {
      state.schoolFilterR = payload;
    },
    handleStudentUnplannedLessonFilter: (state, { payload }) => {
      state.unPlannedLesson = payload;
    },
    handleStudentPage: (state, { payload }) => {
      state.page = payload;
    },
    handleStudentSizePerPage: (state, { payload }) => {
      state.sizePerPage = payload;
    },
    handleClearAllFilters: state => {
      state.levelFilterR = "";
      state.schoolFilterR = "";
      state.unPlannedLesson = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(getStudentAllDetail.pending, state => {
      state.isLoading = true;
      state.StudentsDetails = [];
    });
    builder.addCase(getStudentAllDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.StudentsDetails = action.payload.data?.getAllStudents;
    });
    builder.addCase(getStudentAllDetail.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const {
  tableDataChange,
  handleSort,
  handleStudentLevelFilter,
  handleClearAllFilters,
  handleStudentPage,
  handleStudentSchoolFilter,
  handleStudentSearch,
  handleStudentSizePerPage,
  handleStudentSortField,
  handleStudentSortOrder,
  handleStudentUnplannedLessonFilter,
} = StudentSlice.actions;

export default StudentSlice.reducer;
