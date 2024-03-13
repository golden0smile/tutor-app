const getRoute = ({
  routes = [],
  startingSlash = true,
  trailingSlash = false,
}) =>
  (startingSlash ? "/" : "") +
  (Array.isArray(routes)
    ? routes.join("/")
    : typeof routes === "string"
    ? routes
    : "") +
  (trailingSlash ? "/" : "");

export default getRoute;
