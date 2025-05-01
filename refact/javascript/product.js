const INIT_PRODUCTS = [
  ["1", { name: "", size: 1, color: "#FFFFFF" }],
  ["2", { name: "", size: 1, color: "#E69DB8" }],
];

class Product {
  constructor() {
    this.key = 3;
    this.items = null;
    this.views = [];
  }

  get size() {
    return this.items.values().reduce((a, b) => a + b.size, 0);
  }

  setItem(color) {
    this.items.set(this.key, { name: "", size: 1, color });
    key += 1;
  }

  getItem(key) {
    return this.items.get(key);
  }

  deleteItem(key) {
    this.items.delete(key);
  }

  reset() {
    this.views.splice(0, this.views.length);
  }

  restore() {
    this.reset();

    for (const value of this.items.values()) {
      this.views.push(...Array.from({ length: value.size }).fill(value.name));
    }
  }

  init() {
    if (storage.has("data-keys")) {
      const [keys, values] = storage.getParseArray("data-keys", "data-values");
      const views = keys.map((key, i) => [key, values[i]]);
      this.items = new Map(views);
    } else {
      this.items = new Map(INIT_PRODUCTS);
    }
  }
}

const products = new Product();

const initial = () => {
  products.init();
  products.restore();
  spinner.init();
};

document.addEventListener("DOMContentLoaded", initial);
