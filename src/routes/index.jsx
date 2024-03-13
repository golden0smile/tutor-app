import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Routes as ReactRouterRoutes, Route } from "react-router-dom";

import PageLoader from "components/Loaders/PageLoader";
import RedirectToHome from "components/RedirectToHome";
import RedirectToLogin from "components/RedirectToLogin";
import Layout from "layout";
import routesConfig from "./routes.config";

const Public = route => {
  // Logic for public routes
  const { Component } = route;

  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
};

const Private = route => {
  // Logic for Private routes
  const { Component } = route;

  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
};

const Common = route => {
  const { Component } = route;
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
};

const createNestedRoutes = (routes, RouteType) => {
  return routes.map((route, i) => {
    if (!route.Component) {
      throw new Error("Component must be required....");
    }
    if (route.children) {
      return (
        <Route path={route.path} key={i} element={<RouteType {...route} />}>
          {createNestedRoutes(route.children, RouteType)}
        </Route>
      );
    } else {
      return (
        <Route
          key={i}
          index={route.index}
          path={route.path}
          element={<RouteType {...route} />}
        />
      );
    }
  });
};

const Routes = () => {
  const isAuth = useSelector(state => state.login?.isAuth);
  const isOldUser = useSelector(state => state.login?.isOldUser);

  const {
    private: privateRoutes,
    public: publicRoutes,
    common: commonRoutes,
  } = routesConfig;

  return (
    <ReactRouterRoutes>
      {isAuth && isOldUser ? (
        <>
          <Route index element={<RedirectToHome />} />
          <Route path="/" element={<Layout />}>
            {createNestedRoutes(privateRoutes, Private)}
          </Route>
          <Route path="*" element={<RedirectToHome />} />
        </>
      ) : (
        <>
          <Route index element={<RedirectToLogin />} />
          <Route path="/" element={<Layout />}>
            {createNestedRoutes(publicRoutes, Public)}
          </Route>
          <Route path="*" element={<RedirectToLogin />} />
        </>
      )}
      {createNestedRoutes(commonRoutes, Common)}
    </ReactRouterRoutes>
  );
};

export default Routes;
