const products = new Map([
  ["옵션 1", { size: 1, color: "#F1E7E7" }],
  ["옵션 2", { size: 1, color: "#E69DB8" }],
]);

const viewItems = [];

const initProduct = () => {
  viewItems.splice(0);

  const keys = [...products.keys()];

  for (let i = 0; i < keys.length; i++) {
    viewItems.push(...Array.from({ length: products.get(keys[i]).size }).fill(keys[i]));
  }
};

const addProduct = (product) => {
  const size = products.get(product) ? products.get(product).size + 1 : 1;
  const color = products.get(product) ? products.get(product).color : getColor();
  products.set(product, { size, color });
  initProduct();
  draw(0);
};

const subProduct = (product) => {
  const size = products.get(product).size > 0 ? products.get(product).size - 1 : 0;
  const color = products.get(product) ? products.get(product).color : getColor();
  products.set(product, { size, color });

  if (products.get(product).size === 0) {
    products.delete(product);
  }

  initProduct();
  draw(0);
};
