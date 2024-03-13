import { Navigate } from "react-router-dom";

import routesConstants from "routes/routesConstants";
import getRoute from "routes/utils/getRoute";

const RedirectToLogin = () => {
  return (
    <Navigate
      to={getRoute({
        routes: routesConstants.LOGIN,
      })}
      replace
    />
  );
};
export default RedirectToLogin;
