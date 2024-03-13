import lazy from "utils/lazy";

export const HomePage = lazy(() =>
  import(/* webpackChunkName: "HomePage" */ "modules/dashboard/pages/index"),
);

export const LoginPage = lazy(() =>
  import(/* webpackChunkName: "LoginPage" */ "modules/login"),
);
export const UserPage = lazy(() =>
  import(
    /* webpackChunkName: "Splash" */ "modules/login/component/OnBoardingFlow"
  ),
);

export const SessionPage = lazy(() =>
  import(/* webpackChunkName: "SessionPage" */ "modules/session/pages"),
);

export const SessionDetailedPage = lazy(() =>
  import(
    /* webpackChunkName: "SessionDetailedPage" */ "modules/session/pages/SessionDetails"
  ),
);
export const EditLessonPlan = lazy(() =>
  import(
    /*webpackChunkName: "EditLessonPlan" */ "modules/session/pages/EditLessonPlan"
  ),
);

export const dashBoardPage = lazy(() =>
  import(
    /* webpackChunkName: "dashboardPage" */ "modules/dashboard/pages/index"
  ),
);

export const StudentsPage = lazy(() =>
  import(/* webpackChunkName: "StudentsPage" */ "modules/students"),
);
export const MyLibraryPage = lazy(() =>
  import(/* webpackChunkName: "MyLibraryPage" */ "modules/myLibrary/index"),
);

export const timeSheetsPage = lazy(() =>
  import(
    /* webpackChunkName: "timeSheetsPage" */ "modules/timesheet/pages/index"
  ),
);

export const markingWizard = lazy(() =>
  import(
    /* webpackChunkName: "markingWizardPage" */ "modules/markingWizard/pages/index"
  ),
);

export const AddActivity = lazy(() =>
  import(
    /* webpackChunkName: "addActivity" */ "modules/session/Activity/AddActivity"
  ),
);

export const RemarkReport = lazy(() =>
  import(/* webpackChunkName: "RemarkReport" */ "modules/remarkReport"),
);
