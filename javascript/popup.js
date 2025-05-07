const $winnerPopup = document.querySelector(".winner-popup");
const $result = document.querySelector(".result");
const $percentInSign = document.querySelector(".percent-in-sign");

class Popup {
  constructor() {}

  show(result) {
    $winnerPopup.classList.remove("disabled");

    const data = products.views[result];
    $result.innerHTML = data.name;

    const size = products.getItem(data.key).size;
    const total = products.size;
    $percentInSign.innerHTML = getPercent(size, total);
  }

  hide() {
    $winnerPopup.classList.add("disabled");
  }
}

const popup = new Popup();

document.addEventListener("DOMContentLoaded", () => {
  $winnerPopup.addEventListener("click", popup.hide);
});
