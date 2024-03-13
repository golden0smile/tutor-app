export const localStorageKeys = {};

class LocalStorage {
  static get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static set(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  static remove(key) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}

export default LocalStorage;
