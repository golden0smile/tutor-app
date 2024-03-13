import { configureStore } from "@reduxjs/toolkit";

import homeSlice from "modules/dashboard/features/homeSlice";
import LoginSlice from "modules/login/features/loginSlice";
import MyLibrarySlice from "modules/myLibrary/features/myLibrarySlice";
import reportRemarkSlice from "modules/remarkReport/features/reportRemarkSlice";
import SessionSlice from "modules/session/features/sessionSlice";
import StudentSlice from "modules/students/features/studentSlice";
import TimeSheetSlice from "modules/timesheet/features/timeSheetSlice";

const store = configureStore({
  reducer: {
    home: homeSlice,
    login: LoginSlice,
    session: SessionSlice,
    time: TimeSheetSlice,
    student: StudentSlice,
    myLibrary: MyLibrarySlice,
    report: reportRemarkSlice,
  },
  devTools: true,
});

export default store;
