const INIT_PRODUCTS = [
  ["1", { name: "몬스터헌터 와일즈", size: 1, color: "#FFFFFF" }],
  ["2", { name: "림버스 컴퍼니", size: 1, color: "#E69DB8" }],
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

  setItem(key = this.key, name = "", size = 1, color = getColor()) {
    this.items.set(String(key), { name, size, color });
    this.key += 1;
    this.update();
    this.restore();
  }

  getItem(key) {
    return this.items.get(key);
  }

  deleteItem(key) {
    this.items.delete(key);
    this.update();
    this.restore();
  }

  reset() {
    this.views.splice(0);
  }

  update() {
    storage.setItem("data-keys", JSON.stringify([...this.items.keys()]));
    storage.setItem("data-values", JSON.stringify([...this.items.values()]));
    storage.setItem("key-size", this.key);
  }

  restore() {
    this.reset();

    for (const value of this.items.values()) {
      this.views.push(...Array.from({ length: value.size }).fill(value.name));
    }
  }

  init() {
    if (storage.has("data-keys")) {
      const [keys, values, keySize] = storage.getParseArray("data-keys", "data-values", "key-size");
      const views = keys.map((key, i) => [key, values[i]]);
      this.items = new Map(views);
      this.key = Number(keySize);
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
