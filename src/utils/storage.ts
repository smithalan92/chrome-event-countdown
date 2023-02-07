export async function get<T>(key: string): Promise<T | null> {
  let value = null;

  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'production') {
      // @ts-expect-error
      chrome.storage.local.get(key, (result: any) => {
        if (result && result[key]) {
          resolve(JSON.parse(result[key]));
        } else {
          resolve(null);
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

export function set(key: string, value: any) {
  const stringifiedValue = JSON.stringify(value);

  if (process.env.NODE_ENV === 'production') {
    // @ts-expect-error
    chrome.storage.local.set({ [key]: stringifiedValue });
  } else {
    localStorage.setItem(key, stringifiedValue);
  }
}

export function del(key: string) {
  if (process.env.NODE_ENV === 'production') {
    // @ts-expect-error
    chrome.storage.local.remove(key);
  } else {
    localStorage.removeItem(key);
  }
}
