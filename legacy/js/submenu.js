const subMenu = document.querySelector(".right-area");
const opener = document.querySelector(".right-area-opener");

const switching = () => {
  if (subMenu.classList.contains("close")) {
    subMenu.classList.remove("close");
    opener.classList.remove("close");
  } else {
    subMenu.classList.add("close");
    opener.classList.add("close");
  }
};

const closeSubMenu = () => {
  if (!subMenu.classList.contains("close")) {
    subMenu.classList.add("close");
    opener.classList.add("close");
  }
};
