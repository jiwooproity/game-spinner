const $inputArea = document.querySelector(".input-area");

let keySize = 3;

const createInsertArea = ({ name, size, key }) => {
  const wrapper = document.createElement("div");
  wrapper.className = "product-info";
  wrapper.id = key;

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.key = key;
  nameInput.value = name;
  nameInput.placeholder = "게임명 입력";
  nameInput.addEventListener("change", changeName);

  const sizeInput = document.createElement("input");
  sizeInput.type = "number";
  sizeInput.key = key;
  sizeInput.value = size;
  sizeInput.addEventListener("change", changeSize);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "지우기";
  deleteBtn.key = key;
  deleteBtn.addEventListener("click", deleteProduct);

  wrapper.append(nameInput, sizeInput, deleteBtn);

  return wrapper;
};

const addInsert = () => {
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
};

const onLoad = () => {
  const currentValues = [...products.values()];
  const keys = [...products.keys()];

  const inputEls = currentValues.map((value, index) => {
    return createInsertArea({ name: value.name, size: value.size, key: keys[index] });
  });

  $inputArea.append(...inputEls);
};

document.addEventListener("DOMContentLoaded", onLoad);
