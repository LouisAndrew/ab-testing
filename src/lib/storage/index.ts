import STORAGE_KEYS from "./keys";
type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

type StorageGetOption<T> = {
  defaultValue?: T;
};

export default <T>(key: StorageKey) => ({
  get: function (options?: StorageGetOption<T>) {
    const value = localStorage.getItem(key);
    const parsedValue = value ? (JSON.parse(value) as T) : null;

    if (parsedValue !== null) {
      return parsedValue;
    }

    if (options?.defaultValue !== undefined && options.defaultValue !== null) {
      this.set(options.defaultValue);
      return options.defaultValue;
    }
  },
  set: function (value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }
});
