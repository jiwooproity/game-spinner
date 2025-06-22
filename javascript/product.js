const INIT_PRODUCTS = [
  ["1", { name: "쁘밍", size: 1, color: "#FFFFFF" }],
  ["2", { name: "룰렛", size: 1, color: "#E69DB8" }],
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
    let currentKey = key;

    this.items.set(String(key), { name, size, color });
    this.key += 1;
    this.update();
    this.restore();

    return currentKey;
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

    for (const key of this.items.keys()) {
      const data = this.getItem(key);
      const object = { key, name: data.name };
      this.views.push(...Array.from({ length: data.size }).fill(object));
    }
  }

  init() {
    if (storage.has("data-keys")) {
      const [keys, values, keySize] = storage.getParseArray("data-keys", "data-values", "key-size");
      const views = keys.map((key, i) => [key, values[i]]);
      this.items = new Map(views);
      this.key = Number(keySize);
    } else {
      this.key = 3;
      this.items = new Map(INIT_PRODUCTS);
      this.views = [];
    }
  }
}

const products = new Product();

const initial = () => {
  products.init();
  products.restore();
  spinner.init();
};

const reset = () => {
  if (confirm("룰렛 초기화를 진행할까요?")) {
    resetProduct();
    storage.removeParseArray("data-keys", "data-values", "key-size");
    products.init();
    products.update();
    products.restore();
    initProduct();
  }
};

document.addEventListener("DOMContentLoaded", initial);
