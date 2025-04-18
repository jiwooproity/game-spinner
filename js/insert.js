const $inputArea = document.querySelector(".input-area");

let keySize = localStorage.getItem("key-size") ? +localStorage.getItem("key-size") : 5;

const createInsertArea = ({ name, size, key }) => {
  const wrapper = document.createElement("div");
  wrapper.className = "product-info";
  wrapper.id = key;

  const nameInput = document.createElement("input");
  nameInput.id = "name";
  nameInput.type = "text";
  nameInput.key = key;
  nameInput.value = name;
  nameInput.placeholder = "게임명 입력";
  nameInput.autocomplete = "false";
  nameInput.addEventListener("change", changeName);

  const sizeInput = document.createElement("input");
  sizeInput.id = "number";
  sizeInput.type = "number";
  sizeInput.key = key;
  sizeInput.value = size;
  sizeInput.autocomplete = "false";
  sizeInput.addEventListener("change", changeSize);

  const percent = document.createElement("input");
  percent.id = "percent";
  percent.name = `percent-${key}`;
  percent.type = "text";
  percent.value = "0%";
  percent.readOnly = "true";

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "지우기";
  deleteBtn.key = key;
  deleteBtn.addEventListener("click", deleteProduct);

  wrapper.append(nameInput, sizeInput, percent, deleteBtn);

  return wrapper;
};

const addInsert = () => {
  if (isSpinning) {
    alert("아직 추첨이 진행되고 있어요!");
    return;
  }

  const name = ``;
  const size = 1;
  const color = getColor();
  const key = `${keySize}`;

  const inputEl = createInsertArea({ name, size, key });
  products.set(key, { name, size, color });
  $inputArea.append(inputEl);
  initProduct();
  draw(0);

  keySize += 1;
  localStorage.setItem("key-size", keySize);
};

const onLoad = () => {
  let currentValues = [];
  let keys = [];

  if (localStorage.getItem("data-keys")) {
    currentValues = JSON.parse(localStorage.getItem("data-values"));
    keys = JSON.parse(localStorage.getItem("data-keys"));
  } else {
    currentValues = [...products.values()];
    keys = [...products.keys()];
  }

  const inputEls = currentValues.map((value, index) => {
    return createInsertArea({ name: value.name, size: value.size, key: keys[index] });
  });

  $inputArea.append(...inputEls);
};

document.addEventListener("DOMContentLoaded", onLoad);
