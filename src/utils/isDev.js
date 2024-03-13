const isDev = (ifTrue = true, ifFalse = false) =>
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? ifTrue
    : ifFalse;

export default isDev;
