export const sessionStorageKeys = {};

class SessionStorage {
  static get(key) {
    return JSON.parse(sessionStorage.getItem(key));
  }

  static set(key, value) {
    return sessionStorage.setItem(key, JSON.stringify(value));
  }

  static remove(key) {
    sessionStorage.removeItem(key);
  }

  static clear() {
    sessionStorage.clear();
  }
}

export default SessionStorage;
