const subMenu = document.querySelector(".right-area");
const opener = document.querySelector(".right-area-opener");

const switching = () => {
  if (subMenu.classList.contains("close")) {
    subMenu.classList.remove("close");
    opener.classList.remove("close");
    opener.innerText = ">";
  } else {
    subMenu.classList.add("close");
    opener.classList.add("close");
    opener.innerText = "<";
  }
};

const closeSubMenu = () => {
  if (!subMenu.classList.contains("close")) {
    subMenu.classList.add("close");
    opener.classList.add("close");
    opener.innerText = "<";
  }
};
