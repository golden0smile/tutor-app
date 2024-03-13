import {
  homeIcon,
  sessionIcon,
  studentIcon,
  libraryIcon,
  timesheetIcon,
} from "constants/images";

import routesConstants from "../routes/routesConstants";
export const menuItems = [
  {
    menuName: "Home",
    menuIcon: homeIcon,
    menuIconBlack: homeIcon,
    mainRoute: routesConstants.HOME_PAGE,
    routes: [routesConstants.HOME_PAGE],
  },
  {
    menuName: "Sessions",
    menuIcon: sessionIcon,
    menuIconBlack: sessionIcon,
    mainRoute: routesConstants.SESSION_PAGE,
    routes: [
      routesConstants.SESSION_PAGE,
      routesConstants.EDIT_LESSON_PLAN,
      routesConstants.ADD_ACTIVITY,
    ],
  },
  {
    menuName: "Students",
    menuIcon: studentIcon,
    menuIconBlack: studentIcon,
    mainRoute: routesConstants.STUDENTS,
    routes: [routesConstants.STUDENTS],
  },
  {
    menuName: "My Library",
    menuIcon: libraryIcon,
    menuIconBlack: libraryIcon,
    mainRoute: routesConstants.MY_LIBRARY,
    routes: [routesConstants.MY_LIBRARY],
  },
  {
    menuName: "Timesheet",
    menuIcon: timesheetIcon,
    menuIconBlack: timesheetIcon,
    mainRoute: routesConstants.TIME_SHEETS_PAGE,
    routes: [routesConstants.TIME_SHEETS_PAGE],
  },
];
