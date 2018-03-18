import store from 'store';

export const get = key => store.get(key);

export const set = (key, value) => {
  store.set(key, value);
};

export const remove = (key) => {
  store.remove(key);
};

export const clear = () => {
  store.clearAll();
};
