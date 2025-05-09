const $updateScreen = document.querySelector(".update-screen");
const $updateButton = document.querySelector(".update-btn");

const storageClear = () => {
  localStorage.clear();
  storage.setItem("update-done", "done");
  location.reload();
};

const loadedUpdate = () => {
  if (storage.getItem("update-done") !== "done") {
    $updateScreen.classList.remove("disabled");
    $updateButton.addEventListener("click", () => storageClear());
  }
};

document.addEventListener("DOMContentLoaded", loadedUpdate);
