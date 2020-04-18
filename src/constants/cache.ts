// const storage = window.sessionStorage;
const storage = window.localStorage;

export const saveSessionCache = (key, value) => {
  if (storage === window.sessionStorage) {
    return;
  }
  storage.setItem(key, JSON.stringify(value));
};

