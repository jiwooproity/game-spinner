const products = new Map([
  ["1", { name: "쁘밍", size: 1, color: "#F1E7E7" }],
  ["2", { name: "조아", size: 1, color: "#E69DB8" }],
  // ["옵션 3", { size: 6, color: "#F1E7E7" }],
  // ["옵션 4", { size: 10, color: "#E69DB8" }],
  // ["옵션 5", { size: 4, color: "#F1E7E7" }],
  // ["옵션 6", { size: 5, color: "#E69DB8" }],
  // ["옵션 7", { size: 2, color: "#F1E7E7" }],
  // ["옵션 8", { size: 8, color: "#E69DB8" }],
]);

const viewItems = [];

const initProduct = () => {
  viewItems.splice(0);

  products.forEach((info) => {
    viewItems.push(...Array.from({ length: info.size }).fill(info.name));
  });

  localStorage.setItem("data-keys", JSON.stringify([...products.keys()]));
  localStorage.setItem("data-values", JSON.stringify([...products.values()]));
};

const changeSize = (event) => {
  const { value, key } = event.target;

  if (isSpinning) {
    event.target.value = products.get(key).size;
    alert("아직 추첨이 진행되고 있어요!");
    return;
  }

  if (value < 0) {
    event.target.value = 0;
    return;
  }

  const info = products.get(key);
  products.set(key, { name: info.name, size: +value, color: info.color });
  initProduct();
  draw(0);
};

const changeName = (event) => {
  const { value, key } = event.target;

  if (isSpinning) {
    event.target.value = products.get(key).name;
    alert("아직 추첨이 진행되고 있어요!");
    return;
  }

  const info = products.get(key);
  products.set(key, { name: value, size: info.size, color: info.color });
  initProduct();
  draw(0);
};

const deleteProduct = (event) => {
  const { key } = event.target;

  if (isSpinning) {
    alert("아직 추첨이 진행되고 있어요!");
    return;
  }

  if (products.size > 2) {
    const el = document.querySelector(`div[id="${key}"]`);
    el.remove();

    products.delete(key);
    initProduct();
    draw(0);
  } else {
    alert("최소 2개 이상 등록이 되어 있어야 해요!");
  }
};

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("data-keys")) {
    const keysArray = JSON.parse(localStorage.getItem("data-keys"));
    const valuesArray = JSON.parse(localStorage.getItem("data-values"));

    keysArray.forEach((key, i) => {
      products.set(key, valuesArray[i]);
    });
  }
});
