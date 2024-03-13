import cookies from "js-cookie";
import isDev from "utils/isDev";

const cookieConfig = {
  path: process.env.REACT_APP_COOKIE_PATH,
  domain: isDev(window.location.hostname, process.env.REACT_APP_COOKIE_DOMAIN),
  expires: +process.env.REACT_APP_COOKIE_EXPIRES,
};

const cookieConfigStudent = {
  path: process.env.REACT_APP_COOKIE_PATH,
  domain: isDev(
    window.location.hostname,
    process.env.REACT_APP_COOKIE_DOMAIN_STUDENT,
  ),
  expires: +process.env.REACT_APP_COOKIE_EXPIRES,
};

export const cookieKeys = {
  TOKEN: "token",
  STUDENT_DATA: "studentData",
  REMARK_DATA: "remarkReportData",
};

class Cookies {
  static get(key) {
    return JSON.parse(cookies.get(key) || null);
  }

  static set(key, value, config = cookieConfig) {
    return cookies.set(key, JSON.stringify(value), config);
  }
  static setStudent(key, value, config = cookieConfigStudent) {
    return cookies.set(key, JSON.stringify(value), config);
  }

  static remove(key, config = cookieConfig) {
    cookies.remove(key, config);
  }

  static clear() {
    Object.values(cookieKeys).forEach(key => {
      Cookies.remove(key);
    });
  }
}

export default Cookies;
