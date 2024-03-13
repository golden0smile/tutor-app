import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  SESSION_LIST_URL,
  LESSON_PLAN_LIST,
  RESCHEDULE_LESSON_PLAN_LIST,
  EDIT_LESSON_PLAN_DETAILS,
  UPDATE_LESSON,
  ACTIVITY_LIST_URL,
  ADD_UPDATE_ACTIVITY_URL,
  GET_ACTIVITY_LEVEL_URL,
  STUDENT_DETAILS_BY_SESSION_ID_URL,
  DELETE_ACTIVITY,
  GET_SESSION_STUDENTS,
  END_SESSION,
  END_SESSION_DURATION,
  AWARD_COIN_URL,
  YOUR_LIB_ACTIVITY_LIST_URL,
  VIEW_LESSON_HOMEWORK_REPORT,
  TOGGLE_SESSION_OFFLINE,
  ALL_TOPIC_DETAILS_BY_SUBJECT,
  GRAPH_DETAILS,
  STUDENT_NOTES,
  ADD_NOTE,
  STUDENT_DETAILS,
  PAST_SESSIONS,
  DELETE_NOTES,
  GET_NEXT_ACTIVITY_SUGGESTION_URL,
  TUTOR_REPORT_LIST_DATA,
  SELECT_ACTIVITY_URL,
  SORT_ACTIVITY_LIST_,
  START_SESSION,
  GET_DIAGNOSTICS_ACTIVITY,
  GET_VIDEO_ACTIVITY,
  GET_WORKSHEET_ACTIVITY,
  ACTIVITY_COUNT_URL,
} from "constants/apiUrls";
import { toast } from "react-toastify";
import { axiosParent, axiosTutor } from "services/api";

const initialState = {
  ActivityDetails: [],
  LibraryActivity: [],
  activityCount: 0,
  activityPage: 1,
  SessionDetails: [],
  isLoading: false,
  page: 1,
  totalCounts: 0,
  sizePerPage: 5,
  totalPage: 0,
  sortOrder: "desc",
  sortField: "ses_date",
  searchR: "",
  statusFilterR: "",
  subjectFilterR: "",
  typeFilterR: "",
  dateFilterR: "",
  studentTable: {
    sortOrder: "",
    sortField: "",
    isLoading: false,
    list: [],
    page: 1,
    totalCounts: 0,
    sizePerPage: 5,
    totalPage: 10,
  },
  studentDetails: {
    topicDetailsBySubject: "",
    graphDetails: "",
    notes: "",
    addNotes: "",
    student: "",
    pastSession: null,
    pastSession_sortOrder: "desc",
    pastSession_sortField: "ses_date",
    pastSessionLoading: false,
    deleteNotes: "",
    isLoading: false,
    reportDetails: "",
  },
  nextActivityData: null,
  isLoadNextActivity: false,
  diagnosticList: [],
  isDiagnosticLoading: false,
  sessionStudents: null,
  endSessionDuration: null,
  getViewReportData: null,
};

//getting session details
export const getSessionAllDetail = createAsyncThunk(
  "Session/details",
  async (request, api) => {
    const res = await axiosTutor.post(SESSION_LIST_URL, request, {
      signal: api.signal,
    });
    const data = await res.data;
    return data;
  },
);

//getting activity total cont
export const getActivityCount = createAsyncThunk(
  "Activity/count",
  async (request, { signal }) => {
    const res = await axiosTutor.post(ACTIVITY_COUNT_URL, request);
    // console.log(res);
    const data = await res.data;
    return data;
  },
);

//getting activity list
export const getActivityList = createAsyncThunk(
  "Activity/list",
  async (request, { signal }) => {
    const res = await axiosTutor.post(ACTIVITY_LIST_URL, request, {
      signal,
    });
    // console.log(res);
    const data = await res.data;

    return data;
  },
);

//getting library activity list
export const getLibraryActivityList = createAsyncThunk(
  "LibraryActivity/list",
  async request => {
    const res = await axiosTutor.post(YOUR_LIB_ACTIVITY_LIST_URL, request);
    const data = await res.data;
    return data;
  },
);

//SELECTING THE ACTIVITY
export const setSelectActivity = createAsyncThunk(
  "Activity/select activity",
  async request => {
    const res = await axiosTutor.post(SELECT_ACTIVITY_URL, request);
    const data = await res.data;
    return data;
  },
);

//getting next activity suggestion

export const getNextActivity = createAsyncThunk(
  "Activity/nextActivity",
  async request => {
    const res = await axiosTutor.post(
      GET_NEXT_ACTIVITY_SUGGESTION_URL,
      request,
    );
    const data = await res.data;
    return data;
  },
);

export const getActivityLevel = createAsyncThunk(
  "Activity/levelData",
  async request => {
    const res = await axiosTutor.post(GET_ACTIVITY_LEVEL_URL, request);
    const data = await res.data;
    return data;
  },
);

//award coins
export const setAwardCoins = createAsyncThunk(
  "session/AwardCoin",
  async request => {
    const res = await axiosTutor.post(AWARD_COIN_URL, request);
    const data = await res.data;
    return data;
  },
);

//getting activity list
export const addUpdateActivity = createAsyncThunk(
  "Activity/AddUpdate",
  async request => {
    const res = await axiosTutor.post(ADD_UPDATE_ACTIVITY_URL, request);
    const data = await res.data;
    return data;
  },
);

export const lessonPlanDetails = createAsyncThunk(
  "session/lesson_plan",
  async request => {
    const res =
      request.homework === 1
        ? await axiosTutor.get(
            `${LESSON_PLAN_LIST}/${request.sessionId}?homework=${request.homework}`,
          )
        : request.previous === 1
        ? await axiosTutor.get(
            `${LESSON_PLAN_LIST}/${request.sessionId}?previous=${request.previous}`,
          )
        : await axiosTutor.get(`${LESSON_PLAN_LIST}/${request.sessionId}`);

    const data = await res.data;
    return data;
  },
);

export const RescheduleLessonPlanDetails = createAsyncThunk(
  "session/Reschedule_lesson_plan",
  async request => {
    const res =
      request.homework === 1
        ? await axiosTutor.get(
            `${RESCHEDULE_LESSON_PLAN_LIST}/${request.sessionId}?homework=${request.homework}`,
          )
        : request.previous === 1
        ? await axiosTutor.get(
            `${RESCHEDULE_LESSON_PLAN_LIST}/${request.sessionId}?previous=${request.previous}`,
          )
        : await axiosTutor.get(
            `${RESCHEDULE_LESSON_PLAN_LIST}/${request.sessionId}`,
          );

    const data = await res.data;
    return data;
  },
);

export const editLessonPlanDetails = createAsyncThunk(
  "session/edit_lesson_plan",
  async request => {
    const res = await axiosTutor.post(`${EDIT_LESSON_PLAN_DETAILS}`, request);
    const data = await res.data;
    return data;
  },
);

export const getStudentDetailsBySessionid = createAsyncThunk(
  "session/studentDetails",
  async request => {
    const res = await axiosTutor.post(
      STUDENT_DETAILS_BY_SESSION_ID_URL,
      request,
    );
    const data = await res.data;
    return data;
  },
);

export const previousPlanDetails = createAsyncThunk(
  "session/previous_plan_details",
  async request => {
    const res = await axiosTutor.post(`${EDIT_LESSON_PLAN_DETAILS}`, request);
    const data = await res.data;
    return data;
  },
);

export const updateLessonDetails = createAsyncThunk(
  "session/update_lesson",
  async request => {
    const res = await axiosTutor.post(UPDATE_LESSON, request);
    const data = await res.data;
    return data;
  },
);

export const deleteActivity = createAsyncThunk(
  "session/delete_activity",
  async request => {
    try {
      const res = await axiosTutor.post(DELETE_ACTIVITY, request);
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  },
);

export const getSessionStudents = createAsyncThunk(
  "session/get_session_students",
  async request => {
    try {
      const res = await axiosTutor.get(`${GET_SESSION_STUDENTS}/${request}`);
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  },
);

export const endSessionDetails = createAsyncThunk(
  "session/end_session",
  async request => {
    try {
      const res = await axiosTutor.post(END_SESSION, request);
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  },
);
export const getEndSessionDuration = createAsyncThunk(
  "session/end_session_duration",
  async request => {
    try {
      const res = await axiosTutor.get(`${END_SESSION_DURATION}/${request}`);
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  },
);
export const getViewReport = createAsyncThunk(
  "session/get_view_report",
  async request => {
    try {
      const res = await axiosTutor.post(VIEW_LESSON_HOMEWORK_REPORT, request);
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  },
);

export const toggleSessionOffline = createAsyncThunk(
  "session/toggle_session_offline",
  async request => {
    try {
      const res = await axiosTutor.post(TOGGLE_SESSION_OFFLINE, request);
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  },
);

// Student details modal - report listing
export const allTopicDetailsBySubject = createAsyncThunk(
  "session/all_topic_details_by_subject",
  async request => {
    try {
      const res = await axiosParent.post(ALL_TOPIC_DETAILS_BY_SUBJECT, request);
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  },
);

// Student details modal - report details
export const reportDetailsIncludingGraphChart = createAsyncThunk(
  "session/report_details_including_graph_chart",
  async request => {
    try {
      const res = await axiosParent.post(GRAPH_DETAILS, request);
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  },
);

// Student details modal - student notes
export const getStudentNotes = createAsyncThunk(
  "session/get_student_notes",
  async request => {
    try {
      const res = await axiosTutor.post(STUDENT_NOTES, request);
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  },
);

// Student details modal - add notes
export const addLessonNotesDetails = createAsyncThunk(
  "session/add_lesson_notes",
  async request => {
    try {
      const res = await axiosTutor.post(ADD_NOTE, request);
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  },
);

// Student details modal - details
export const getStudentDetails = createAsyncThunk(
  "session/get_student_details",
  async request => {
    try {
      const res = await axiosTutor.post(STUDENT_DETAILS, request);
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  },
);

// Student details modal - list past sessions
export const getPastSessions = createAsyncThunk(
  "session/get_past_sessions",
  async request => {
    try {
      const res = await axiosTutor.post(PAST_SESSIONS, request);
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  },
);

// Student details modal - delete Notes
export const getDeleteNotes = createAsyncThunk(
  "session/get_delete_notes",
  async request => {
    try {
      const res = await axiosTutor.post(DELETE_NOTES, request);
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  },
);

// Student details modal - report section
export const getTutorReportListData = createAsyncThunk(
  "session/get_tutor_report_list_data",
  async request => {
    try {
      const res = await axiosTutor.post(TUTOR_REPORT_LIST_DATA, request);
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  },
);

// sort activity list
export const getSortActivityList = createAsyncThunk(
  "session/get_sort_activity_list",
  async request => {
    try {
      const res = await axiosTutor.post(SORT_ACTIVITY_LIST_, request);
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  },
);

// start session
export const getStartSession = createAsyncThunk(
  "session/get_start_session",
  async request => {
    try {
      const res = await axiosTutor.post(START_SESSION, request);
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  },
);
// get worksheet activity list
export const getWorksheetActivities = createAsyncThunk(
  "session/worksheetList",
  async request => {
    try {
      const res = await axiosTutor.post(GET_WORKSHEET_ACTIVITY, request);
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  },
);

// get video activity list
export const getVideoActivities = createAsyncThunk(
  "session/videoList",
  async request => {
    try {
      const res = await axiosTutor.post(GET_VIDEO_ACTIVITY, request);
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  },
);

// get diagnostics activity list
export const getDiagnosticsActivities = createAsyncThunk(
  "session/get_diagnostics_activity",
  async request => {
    try {
      const res = await axiosTutor.post(GET_DIAGNOSTICS_ACTIVITY, request);
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  },
);

export const SessionSlice = createSlice({
  name: "Session",
  initialState,
  reducers: {
    handleSessionSearch: (state, { payload }) => {
      state.page = 1;
      state.searchR = payload;
    },
    handleSessionSortField: (state, { payload }) => {
      state.sortField = payload;
    },
    handleSessionSortOrder: (state, { payload }) => {
      state.sortOrder = payload;
    },
    handleSessionStatusFilter: (state, { payload }) => {
      state.page = 1;
      state.statusFilterR = payload;
    },
    handleSessionSubjectFilter: (state, { payload }) => {
      state.page = 1;
      state.subjectFilterR = payload;
    },
    handleSessionTypeFilter: (state, { payload }) => {
      state.page = 1;
      state.typeFilterR = payload;
    },
    handleSessionDateFilter: (state, { payload }) => {
      state.page = 1;
      state.dateFilterR = payload;
    },
    handleSessionPage: (state, { payload }) => {
      state.page = payload;
    },
    handleSessionSizePerPage: (state, { payload }) => {
      state.page = 1;
      state.sizePerPage = payload;
    },
    handleClearAllFilters: state => {
      state.typeFilterR = "";
      state.dateFilterR = "";
      state.statusFilterR = "";
      state.subjectFilterR = "";
    },

    //for student table inside session
    handleStudentTabSortField: (state, { payload }) => {
      state.studentTable.sortField = payload;
    },
    handleStudentTabSortOrder: (state, { payload }) => {
      state.studentTable.sortOrder = payload;
    },
    handleStudentTabPage: (state, { payload }) => {
      state.studentTable.page = payload;
    },
    handleStudentTabSizePerPage: (state, { payload }) => {
      state.studentTable.sizePerPage = payload;
    },
    //activity
    handleActivityPage: (state, { payload }) => {
      state.activityPage = payload;
    },
    //for past session
    handlePastSessionSortField: (state, { payload }) => {
      state.studentDetails.pastSession_sortField = payload;
    },
    handlePastSessionSortOrder: (state, { payload }) => {
      state.studentDetails.pastSession_sortOrder = payload;
    },

    //remove suggested activity
    handleRemoveSuggestedActivity: (state, { payload }) => {
      state.nextActivityData = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(getSessionAllDetail.pending, state => {
      state.isLoading = true;
      state.SessionDetails = [];
    });
    builder.addCase(getSessionAllDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.SessionDetails = action.payload.data;
      state.totalCounts = action.payload.data.totalCounts;
      // state.totalPage = action.payload.data.totalPages;
      state.totalPage = Math.ceil(
        action.payload.data?.totalCounts / state.sizePerPage,
      );
    });
    builder.addCase(getSessionAllDetail.rejected, (state, action) => {
      if (!action?.meta?.aborted) {
        state.isLoading = false;
        toast.error(action?.error.message);
      }
    });
    // lesson plan details
    builder.addCase(lessonPlanDetails.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(lessonPlanDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.lessonPlan = action.payload.data?.session;
    });
    builder.addCase(lessonPlanDetails.rejected, state => {
      state.isLoading = false;
    });
    //reschedule plan details

    builder.addCase(RescheduleLessonPlanDetails.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(RescheduleLessonPlanDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.lessonPlan = action.payload.data?.session;
    });
    builder.addCase(RescheduleLessonPlanDetails.rejected, state => {
      state.isLoading = false;
    });
    // edit lesson plan
    builder.addCase(editLessonPlanDetails.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(editLessonPlanDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.editLessonPlan = action.payload.data?.lesson;
    });
    builder.addCase(editLessonPlanDetails.rejected, state => {
      state.isLoading = false;
    });
    // previous plan details
    builder.addCase(previousPlanDetails.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(previousPlanDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.previousPlan = action.payload.data?.lesson;
    });
    builder.addCase(previousPlanDetails.rejected, state => {
      state.isLoading = false;
    });
    // update lesson
    builder.addCase(updateLessonDetails.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(updateLessonDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.updateLesson = action.payload?.statusCode;
    });
    builder.addCase(updateLessonDetails.rejected, state => {
      state.isLoading = false;
    });
    //activity

    builder.addCase(getActivityCount.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.activityCount = payload?.data?.activityCount;
    });

    builder.addCase(getActivityList.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getActivityList.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.ActivityDetails = payload?.activities;
    });
    builder.addCase(getActivityList.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action?.error.message);
    });
    builder.addCase(getActivityLevel.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ActivityLevelData = action.payload?.data;
    });

    // getStudentDetailsBySessionid
    builder.addCase(getStudentDetailsBySessionid.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getStudentDetailsBySessionid.fulfilled, (state, action) => {
      state.isLoading = false;
      state.studentTable.list = action.payload?.data;
    });
    builder.addCase(getStudentDetailsBySessionid.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action?.error.message);
    });
    //get next activity
    builder.addCase(getNextActivity.pending, state => {
      state.isLoadNextActivity = true;
    });
    builder.addCase(getNextActivity.fulfilled, (state, action) => {
      state.isLoadNextActivity = false;
      state.nextActivityData = action.payload?.data;
    });
    builder.addCase(getNextActivity.rejected, (state, action) => {
      state.isLoadNextActivity = false;
      toast.error(action?.error.message);
    });

    //delete activity
    builder.addCase(deleteActivity.fulfilled, (state, action) => {
      state.isLoading = false;
      state.deleteActivityStatus = action.payload?.data;
    });
    builder.addCase(deleteActivity.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(deleteActivity.pending, state => {
      state.isLoading = false;
    });
    builder.addCase(getSessionStudents.fulfilled, (state, action) => {
      state.isLoading = false;
      state.sessionStudents = action.payload?.data?.session;
    });
    builder.addCase(getSessionStudents.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(getSessionStudents.pending, state => {
      state.isLoading = false;
    });
    builder.addCase(endSessionDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.endSessionStatus = action.payload?.data;
    });
    builder.addCase(endSessionDetails.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(endSessionDetails.pending, state => {
      state.isLoading = false;
    });
    builder.addCase(getEndSessionDuration.fulfilled, (state, action) => {
      state.isLoading = false;
      state.endSessionDuration = action.payload?.data;
    });
    builder.addCase(getEndSessionDuration.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(getEndSessionDuration.pending, state => {
      state.isLoading = false;
    });
    // award coins
    builder.addCase(setAwardCoins.fulfilled, (state, action) => {
      state.isLoading = false;

      state.awardCoinsDetails = action.payload?.data;
    });
    builder.addCase(setAwardCoins.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(setAwardCoins.pending, state => {
      state.isLoading = false;
    });
    // view lesson and homework report
    builder.addCase(getViewReport.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getViewReportData = action.payload?.data;
    });
    builder.addCase(getViewReport.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(getViewReport.pending, state => {
      state.isLoading = false;
    });

    // toggle session offline
    builder.addCase(toggleSessionOffline.fulfilled, (state, action) => {
      state.isLoading = false;
      state.toggleSessionOfflineStatus = action.payload?.data;
    });
    builder.addCase(toggleSessionOffline.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(toggleSessionOffline.pending, state => {
      state.isLoading = false;
    });
    // report listing - student details
    builder.addCase(allTopicDetailsBySubject.fulfilled, (state, action) => {
      state.studentDetails.isLoading = false;
      state.studentDetails.topicDetailsBySubject = action.payload?.data;
    });
    builder.addCase(allTopicDetailsBySubject.rejected, state => {
      state.studentDetails.isLoading = false;
    });
    builder.addCase(allTopicDetailsBySubject.pending, state => {
      state.studentDetails.isLoading = false;
    });
    // report details - student details
    builder.addCase(
      reportDetailsIncludingGraphChart.fulfilled,
      (state, action) => {
        state.studentDetails.isLoading = false;
        state.studentDetails.graphDetails = action.payload?.data;
      },
    );
    builder.addCase(reportDetailsIncludingGraphChart.rejected, state => {
      state.studentDetails.isLoading = false;
    });
    builder.addCase(reportDetailsIncludingGraphChart.pending, state => {
      state.studentDetails.isLoading = false;
    });
    // notes listing - student details
    builder.addCase(getStudentNotes.fulfilled, (state, action) => {
      state.studentDetails.isLoading = false;
      state.studentDetails.notes = action.payload?.data;
    });
    builder.addCase(getStudentNotes.rejected, state => {
      state.studentDetails.isLoading = false;
    });
    builder.addCase(getStudentNotes.pending, state => {
      state.studentDetails.isLoading = false;
    });
    // add notes - student details
    builder.addCase(addLessonNotesDetails.fulfilled, (state, action) => {
      state.studentDetails.isLoading = false;
      state.studentDetails.addNotes = action.payload?.data;
    });
    builder.addCase(addLessonNotesDetails.rejected, state => {
      state.studentDetails.isLoading = false;
    });
    builder.addCase(addLessonNotesDetails.pending, state => {
      state.studentDetails.isLoading = false;
    });
    // -- - student details
    builder.addCase(getStudentDetails.fulfilled, (state, action) => {
      state.studentDetails.isLoading = false;
      state.studentDetails.student = action.payload?.data;
    });
    builder.addCase(getStudentDetails.rejected, state => {
      state.studentDetails.isLoading = false;
    });
    builder.addCase(getStudentDetails.pending, state => {
      state.studentDetails.isLoading = false;
    });

    // view past sessions - student details
    builder.addCase(getPastSessions.fulfilled, (state, action) => {
      state.pastSessionLoading = false;
      state.studentDetails.pastSession = action.payload?.data;
    });
    builder.addCase(getPastSessions.rejected, state => {
      state.pastSessionLoading = false;
    });
    builder.addCase(getPastSessions.pending, state => {
      state.pastSessionLoading = false;
    });
    // delete notes - student details
    builder.addCase(getDeleteNotes.fulfilled, (state, action) => {
      state.studentDetails.isLoading = false;
      state.studentDetails.deleteNotes = action.payload?.data;
    });
    builder.addCase(getDeleteNotes.rejected, state => {
      state.studentDetails.isLoading = false;
    });
    builder.addCase(getDeleteNotes.pending, state => {
      state.studentDetails.isLoading = false;
    });
    // report details - student details
    builder.addCase(getTutorReportListData.fulfilled, (state, action) => {
      state.studentDetails.isLoading = false;
      state.studentDetails.reportDetails = action.payload?.data;
    });
    builder.addCase(getTutorReportListData.rejected, state => {
      state.studentDetails.isLoading = false;
    });
    builder.addCase(getTutorReportListData.pending, state => {
      state.studentDetails.isLoading = false;
    });
    // sort activity list
    builder.addCase(getSortActivityList.fulfilled, (state, action) => {
      state.studentDetails.isLoading = false;
      state.sortActivityList = action.payload?.data;
    });
    builder.addCase(getSortActivityList.rejected, state => {
      state.studentDetails.isLoading = false;
    });
    builder.addCase(getSortActivityList.pending, state => {
      state.studentDetails.isLoading = false;
    });
    // start session
    builder.addCase(getStartSession.fulfilled, (state, action) => {
      state.studentDetails.isLoading = false;
      state.startSession = action.payload?.data;
    });
    builder.addCase(getStartSession.rejected, state => {
      state.studentDetails.isLoading = false;
    });
    builder.addCase(getStartSession.pending, state => {
      state.studentDetails.isLoading = false;
    });
    // get diagnostic activity
    builder.addCase(getDiagnosticsActivities.fulfilled, (state, action) => {
      state.isDiagnosticLoading = false;
      state.diagnosticList = action?.payload;
    });
    builder.addCase(getDiagnosticsActivities.rejected, state => {
      state.isDiagnosticLoading = false;
    });
    builder.addCase(getDiagnosticsActivities.pending, state => {
      state.isDiagnosticLoading = false;
    });
  },
});

export const {
  handleSessionSortField,
  handleSessionSortOrder,
  handleSessionStatusFilter,
  handleSessionSubjectFilter,
  handleSessionTypeFilter,
  handleSessionDateFilter,
  handleSessionSearch,
  handleSessionSizePerPage,
  handleSessionPage,
  handleClearAllFilters,
  handleStudentTabSortField,
  handleStudentTabSortOrder,
  handleStudentTabPage,
  handleStudentTabSizePerPage,
  handleActivityPage,
  handlePastSessionSortField,
  handlePastSessionSortOrder,
  handleRemoveSuggestedActivity,
} = SessionSlice.actions;

export default SessionSlice.reducer;
