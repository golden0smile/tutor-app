import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  TUTOR_LOGIN_URL,
  MAINTENANCE_URL,
  TUTOR_DETAILS_URL,
  UPDATE_TUTOR_DETAILS_URL,
  UPDATE_TERM_CONDITION_URL,
  GET_CONTENT_URL,
} from "constants/apiUrls";
import Cookies, { cookieKeys } from "services/cookies";
import { axiosApi, axiosTutor, axiosStudent } from "services/api";
import LocalStorage from "services/localStorage";

const initialState = {
  userToken: "",
  userId: 0,
  isLoading: false,
  isAuth: !!Cookies.get(cookieKeys.TOKEN),
  isOldUser: !!LocalStorage.get("isOldUser"),
  maintenanceMsg: "",
  userDetails: "",
  errorMsg: "",
  modalContent: "",
};

export const tutorLogin = createAsyncThunk(
  "login/tutorLogin",
  async (request, thunkAPI) => {
    try {
      const res = await axiosTutor.post(TUTOR_LOGIN_URL, request);
      const Data = res.data;
      if (Data?.data?.access_token) {
        Cookies.set(cookieKeys.TOKEN, Data?.data?.access_token);
      }
      return Data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  },
);

export const getMaintenanceMessage = createAsyncThunk(
  "maintenance",
  async () => {
    const res = await axiosApi.get(`${MAINTENANCE_URL}/1`);
    const data = await res.data;
    return data;
  },
);

export const getTutorAllDetail = createAsyncThunk(
  "tutor/details",
  async request => {
    const res = await axiosTutor.get(TUTOR_DETAILS_URL);
    const data = await res.data;
    return data;
  },
);

//update user details
export const setTutorAllDetail = createAsyncThunk(
  "tutor/details",
  async request => {
    const res = await axiosTutor.post(UPDATE_TUTOR_DETAILS_URL, request);
    // const res = await axiosTutor.post(TUTOR_DETAILS_URL, request);
    const data = await res.data;
    return data;
  },
);

//update TERM AND CONDIONS
export const setTermCondition = createAsyncThunk(
  "term-condition",
  async request => {
    const res = await axiosStudent.put(UPDATE_TERM_CONDITION_URL);
    const data = await res.data;
    return data;
  },
);
//get the content for TERM AND CONDIONS
export const getTermConditionOrPrivacyContent = createAsyncThunk(
  "modalContent",
  async request => {
    const res = await axiosTutor.get(`${GET_CONTENT_URL}/${request}`);
    const data = await res.data;
    return data;
  },
);

export const LoginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    changeIsOldUser: (state, { payload }) => {
      state.isOldUser = payload?.isOldUser;
      LocalStorage.set("isOldUser", payload.isOldUser);
      payload.step && LocalStorage.set("step", payload.step);
    },
    logout: state => {
      state.isAuth = false;
      state.user = null;
      state.isOldUser = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(tutorLogin.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(tutorLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userToken = action.payload?.data?.access_token;
      state.isAuth = !!action.payload?.data?.access_token;
      state.userId = action.payload?.data?.user_id;
    });
    builder.addCase(tutorLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMsg = action?.payload?.message;
    });
    //for message only
    builder.addCase(getMaintenanceMessage.fulfilled, (state, action) => {
      state.maintenanceMsg = action.payload.data?.maintenanceMessage;
    });

    //for boarding & userDetails
    builder.addCase(getTutorAllDetail.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getTutorAllDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userDetails = action.payload.data;
    });
    builder.addCase(getTutorAllDetail.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(
      getTermConditionOrPrivacyContent.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.modalContent = action.payload.data;
      },
    );
  },
});

export const { changeIsOldUser, logout } = LoginSlice.actions;

export default LoginSlice.reducer;
