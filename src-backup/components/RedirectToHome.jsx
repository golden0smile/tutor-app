import { Navigate } from "react-router-dom";

import routesConstants from "routes/routesConstants";
import getRoute from "routes/utils/getRoute";

const RedirectToHome = () => {
  return (
    <Navigate
      to={getRoute({
        routes: routesConstants.HOME_PAGE,
      })}
      replace
    />
  );
};

export default RedirectToHome;
