export const getOSName = () => {
  var userAgent = window.navigator.userAgent,
    platform = navigator?.userAgentData?.platform || "unknown",
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"],
    os = null;
  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "Mac OS";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "iOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows";
  } else if (/Android/.test(userAgent)) {
    os = "Android";
  } else if (!os && /Linux/.test(platform)) {
    os = "Linux";
  }
  return os;
};

export const getBrowserName = () => {
  let sBrowser;
  const sUsrAg = navigator.userAgent;
  if (sUsrAg.indexOf("Firefox") > -1) {
    sBrowser = "firefox";
  } else if (sUsrAg.indexOf("SamsungBrowser") > -1) {
    sBrowser = "Samsung Internet";
  } else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
    sBrowser = "opera";
  } else if (sUsrAg.indexOf("Trident") > -1) {
    sBrowser = "Microsoft Internet Explorer";
  } else if (sUsrAg.indexOf("Edge") > -1) {
    sBrowser = "Microsoft Edge (Legacy)";
  } else if (sUsrAg.indexOf("Edg") > -1) {
    sBrowser = "edge";
  } else if (sUsrAg.indexOf("Chrome") > -1) {
    sBrowser = "chrome";
  } else if (sUsrAg.indexOf("Safari") > -1) {
    sBrowser = "safari";
  } else {
    sBrowser = "unknown";
  }
  return sBrowser;
};
