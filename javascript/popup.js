const $winnerPopup = document.querySelector(".winner-popup");
const $result = document.querySelector(".result");

class Popup {
  constructor() {}

  show(result) {
    $winnerPopup.classList.remove("disabled");
    $result.innerHTML = result;
  }

  hide() {
    $winnerPopup.classList.add("disabled");
  }
}

const popup = new Popup();

document.addEventListener("DOMContentLoaded", () => {
  $winnerPopup.addEventListener("click", popup.hide);
});
