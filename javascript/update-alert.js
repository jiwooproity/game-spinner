const $updateScreen = document.querySelector(".update-screen");
const $updateButton = document.querySelector(".update-btn");
const $bbeggom = document.querySelector(".bbeggom-bbuming");

const mouseover = () => {
  $bbeggom.src = "./images/bbeggom-surprize.gif";
};

const mouseout = () => {
  $bbeggom.src = "./images/bbeggom.gif";
};

const storageClear = () => {
  localStorage.clear();
  storage.setItem("update-done", "done");
  location.reload();
};

const loadedUpdate = () => {
  if (storage.getItem("update-done") !== "done") {
    $updateScreen.classList.remove("disabled");
    $updateButton.addEventListener("click", storageClear);
    $updateButton.addEventListener("mouseover", mouseover);
  }

  $bbeggom.addEventListener("mouseover", mouseover);
  $bbeggom.addEventListener("mouseout", mouseout);
};

document.addEventListener("DOMContentLoaded", loadedUpdate);
