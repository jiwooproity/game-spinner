class Storage {
  constructor() {}

  setItem(key, value) {
    localStorage.setItem(key, value);
  }

  getItem(key, type) {
    switch (type) {
      case "boolean":
        return Boolean(localStorage.getItem(key));
      case "number":
        return Number(localStorage.getItem(key));
      default:
        return localStorage.getItem(key);
    }
  }

  getParse(key) {
    return JSON.parse(this.getItem(key));
  }

  getParseArray(...keys) {
    return keys.map((key) => JSON.parse(this.getItem(key)));
  }

  removeItem(key) {
    localStorage.removeItem(key);
  }

  removeParseArray(...keys) {
    return keys.map((key) => this.removeItem(key));
  }

  has(key) {
    return this.getItem(key) !== null;
  }
}

const storage = new Storage();
