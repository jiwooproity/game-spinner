const $standbyScreen = document.querySelector(".standby-screen");
const $standbyButton = document.querySelector(".standby-btn");

const $bbeggomBbumming = document.querySelector(".bbeggom-bbuming");

const disableStandby = () => {
  $standbyScreen.classList.add("disabled");
};

const changeBbeggomImage = (e) => {
  if (e.type === "mouseout") {
    $bbeggomBbumming.src = "./images/bbeggom.gif";
  } else {
    $bbeggomBbumming.src = "./images/bbeggom-surprize.gif";
  }
};

const standby = () => {
  $standbyButton.addEventListener("click", disableStandby);
  $bbeggomBbumming.addEventListener("mouseout", changeBbeggomImage);
  $bbeggomBbumming.addEventListener("mouseover", changeBbeggomImage);
};

document.addEventListener("DOMContentLoaded", standby);
