const $tableBody = document.querySelector(".menu-table > tbody");
const $fontSize = document.getElementById("font-size");
const $spinnerSize = document.getElementById("spinner-size");

const screenshot = async () => {
  const date = new Date();
  const today = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

  const captureTarget = document.querySelector(".container");
  const getCaptureOfDOM = await html2canvas(captureTarget, { scale: 4 });

  const link = document.createElement("a");
  link.href = getCaptureOfDOM.toDataURL("image/png");
  link.download = `쁘밍의_게임_룰렛_${today}.png`;
  link.click();
};

const changeFontSize = (e) => {
  const { value } = e.target;

  if (Number(value) < 15) {
    e.target.value = 15;
  } else if (Number(value) > 30) {
    e.target.value = 30;
  } else {
    spinner.setFontSize(Number(value));
  }
};

const changeSpinnerSize = (e) => {
  const { value } = e.target;

  if (Number(value) < 500) {
    e.target.value = 500;
  } else if (Number(value) > 700) {
    e.target.value = 700;
  } else {
    spinner.setCanvasSize(Number(value));
  }
};

const addProduct = () => {
  const key = products.setItem();
  initProduct();

  const el = document.getElementById(`game-${key}`);
  el.focus();
};

const deleteProduct = (key) => {
  if (products.views.length > 2) {
    const productRow = document.querySelector(`tr[id="product-${key}"]`);
    productRow.remove();

    products.deleteItem(key);
    initProduct();
  }
};

const setProductName = (e) => {
  const { name: key, value } = e.target;
  const { size, color } = products.getItem(key);

  products.setItem(key, value, size, color);
  spinner.draw();
};

const setProductSize = (e) => {
  const { name: key, value } = e.target;
  const { name, color } = products.getItem(key);

  if (Number(value) > 0) {
    products.setItem(key, name, Number(value), color);
  } else {
    e.target.value = 1;
  }

  for (let key of products.items.keys()) {
    const el = document.getElementById(`percent-${key}`);
    el.value = getPercent(products.getItem(key).size, products.size);
  }

  spinner.draw();
};

const createProduct = ({ key, name, size, color }) => {
  const $color = document.createElement("div");
  $color.className = "color";
  $color.style.backgroundColor = color;

  const $tableData1 = document.createElement("td");
  $tableData1.append($color);

  const $inputGame = document.createElement("input");
  $inputGame.className = "game";
  $inputGame.type = "text";
  $inputGame.id = `game-${key}`;
  $inputGame.name = key;
  $inputGame.value = name;
  $inputGame.autocomplete = "off";
  $inputGame.addEventListener("change", setProductName);

  const $tableData2 = document.createElement("td");
  $tableData2.append($inputGame);

  const $inputLength = document.createElement("input");
  $inputLength.className = "length";
  $inputLength.type = "number";
  $inputLength.name = key;
  $inputLength.value = size;
  $inputLength.autocomplete = "off";
  $inputLength.addEventListener("change", setProductSize);

  const $tableData3 = document.createElement("td");
  $tableData3.append($inputLength);

  const $inputPercent = document.createElement("input");
  $inputPercent.className = "percent";
  $inputPercent.type = "text";
  $inputPercent.id = `percent-${key}`;
  $inputPercent.name = key;
  $inputPercent.readOnly = "true";
  $inputPercent.tabIndex = -1;
  $inputPercent.value = getPercent(size, products.size);

  const $tableData4 = document.createElement("td");
  $tableData4.append($inputPercent);

  const $deleteBtn = document.createElement("button");
  $deleteBtn.className = "delete-btn";
  $deleteBtn.name = key;
  $deleteBtn.tabIndex = -1;
  $deleteBtn.addEventListener("click", () => deleteProduct(key));

  const $tableData5 = document.createElement("td");
  $tableData5.append($deleteBtn);

  return [$tableData1, $tableData2, $tableData3, $tableData4, $tableData5];
};

const initProduct = () => {
  for (let key of products.items.keys()) {
    const product = document.getElementById(`product-${key}`);
    if (product) product.remove();
  }

  render();
  spinner.draw();
};

const render = () => {
  for (let key of products.items.keys()) {
    const $products = createProduct({ key, ...products.getItem(key) });

    const $tableRow = document.createElement("tr");
    $tableRow.id = `product-${key}`;
    $tableRow.className = "menu-item";

    $tableRow.append(...$products);
    $tableBody.append($tableRow);
  }

  const $spinnerMenu = document.querySelector(".spinner-menu");
  $spinnerMenu.style.maxHeight = `${storage.getItem("spinner-size") ?? 500}px`;

  $fontSize.value = storage.getItem("font-size") ?? 15;
  $fontSize.addEventListener("change", changeFontSize);

  $spinnerSize.value = storage.getItem("spinner-size") ?? 500;
  $spinnerSize.addEventListener("change", changeSpinnerSize);
};

document.addEventListener("DOMContentLoaded", render);
