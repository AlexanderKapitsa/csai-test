const LocalStorageOperator = (key) => ({
  save: (value) => {
    try {
      const serializedValue = JSON.stringify(value);

      localStorage.setItem(key, serializedValue);
    } catch (e) {
      console.log(e);
    }
  },
  load: () => {
    try {
      const data = localStorage.getItem(key);

      return JSON.parse(data);
    } catch (e) {
      console.log(e);
    }
  },
});

export default LocalStorageOperator;
