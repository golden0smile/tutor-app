import { Outlet } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  SessionDetailedPage,
  SessionPage,
  dashBoardPage,
  UserPage,
  StudentsPage,
  MyLibraryPage,
  markingWizard,
  timeSheetsPage,
  EditLessonPlan,
  AddActivity,
  RemarkReport,
} from "./routeImports";
import routesConstants from "./routesConstants";

const routesConfig = {
  private: [
    {
      path: routesConstants.HOME_PAGE,
      Component: HomePage,
    },
    {
      path: routesConstants.SESSION_PAGE,
      Component: Outlet,
      children: [
        { index: true, Component: SessionPage },
        { path: ":sessionDetailedId", Component: SessionDetailedPage },
      ],
    },
    {
      path: routesConstants.EDIT_LESSON_PLAN,
      Component: Outlet,
      children: [
        { index: true, Component: EditLessonPlan },
        {
          path: ":lessonPlanId",
          Component: Outlet,
          children: [
            {
              index: true,
              Component: EditLessonPlan,
            },
          ],
        },
      ],
    },
    {
      path: routesConstants.ADD_ACTIVITY,
      Component: AddActivity,
    },

    {
      path: routesConstants.DASHBOARD_PAGE,
      Component: dashBoardPage,
    },
    {
      path: routesConstants.REMARK_REPORT,
      Component: RemarkReport,
    },
    {
      path: routesConstants.STUDENTS,
      Component: StudentsPage,
    },
    {
      path: routesConstants.MY_LIBRARY,
      Component: MyLibraryPage,
    },
    {
      path: routesConstants.TIME_SHEETS_PAGE,
      Component: timeSheetsPage,
    },
    {
      path: routesConstants.MARKING_WIZARD_PAGE,
      Component: markingWizard,
    },
  ],
  public: [
    {
      path: routesConstants.LOGIN,
      Component: LoginPage,
    },
    {
      path: routesConstants.USER,
      Component: UserPage,
    },
  ],
  common: [],
};

export default routesConfig;
