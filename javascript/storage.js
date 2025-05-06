class Storage {
  constructor() {}

  setItem(key, value) {
    localStorage.setItem(key, value);
  }

  getItem(key) {
    return localStorage.getItem(key);
  }

  getParse(key) {
    return JSON.parse(this.getItem(key));
  }

  getParseArray(...keys) {
    return keys.map((key) => JSON.parse(this.getItem(key)));
  }

  has(key) {
    return this.getItem(key) !== null;
  }
}

const storage = new Storage();
