/* eslint-disable no-undef */
/* eslint-disable no-console */

export async function get(key) {
  let value = null;

  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'production') {
      chrome.storage.local.get(key, (result) => {
        if (result && result[key]) {
          resolve(JSON.parse(result[key]));
        } else {
          resolve([]);
        }
      });
    } else {
      value = localStorage.getItem(key);
      if (value) {
        try {
          value = JSON.parse(value);
        } catch (e) {
          reject(e);
        }
      }
      resolve(value);
    }
  });
}

export function set(key, value) {
  const stringifiedValue = JSON.stringify(value);

  if (process.env.NODE_ENV === 'production') {
    chrome.storage.local.set({ [key]: stringifiedValue });
  } else {
    localStorage.setItem(key, stringifiedValue);
  }
}

export function del(key) {
  if (process.env.NODE_ENV === 'production') {
    chrome.storage.local.remove(key);
  } else {
    localStorage.removeItem(key);
  }
}
