/* eslint-disable no-undef */
/* eslint-disable no-console */

export function get(key) {
  let value = null;

  if (process.env.NODE_ENV === 'production') {
    value = chrome.storage.local.get(key);
  } else {
    value = localStorage.getItem(key);
  }

  if (value) {
    return JSON.parse(value);
  }
  return value;
}

export function set(key, value) {
  const stringifiedValue = JSON.stringify(value);

  if (process.env.NODE_ENV === 'production') {
    chrome.storage.local.set({ [key]: stringifiedValue });
  } else {
    localStorage.setItem(key, stringifiedValue);
  }
}
