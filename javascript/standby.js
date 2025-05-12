const $standbyScreen = document.querySelector(".standby-screen");
const $standbyButton = document.querySelector(".standby-btn");
const $bbeggomBbumming = document.querySelector(".bbeggom-bbuming");
const $standbyText = document.querySelector(".standby-text");

const TYPING_TEXT = ["쁘밍의 게임 룰렛", "팔로우 해줄래 ..?", "좋감고않", "오늘도 와줘서 고마워"];
let typingInterval = null;
let typingIdx = 0;

const removeText = () => {
  let replace = TYPING_TEXT[typingIdx];

  typingInterval = setInterval(() => {
    if (replace !== "") {
      replace = replace.slice(0, replace.length - 1);
      $standbyText.innerHTML = replace;
    } else {
      if (typingIdx + 1 < TYPING_TEXT.length) {
        typingIdx += 1;
      } else {
        typingIdx = 0;
      }

      clearInterval(typingInterval);
      typingText();
    }
  }, 100);
};

const typingText = () => {
  let idx = 0;

  let text = TYPING_TEXT[typingIdx];
  let size = text.length;

  typingInterval = setInterval(() => {
    if (idx < size) {
      $standbyText.innerHTML += text[idx];
      idx += 1;
    } else {
      setTimeout(() => {
        removeText();
      }, 3000);

      clearInterval(typingInterval);
    }
  }, 200);
};

const disableStandby = () => {
  clearInterval(typingInterval);
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
  typingText();
};

document.addEventListener("DOMContentLoaded", standby);
