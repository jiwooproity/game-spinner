const $spinnerSize = document.getElementById("spinner-size");
const $fontSize = document.getElementById("font-size");

const resizeSpinner = (event) => {
  let { value } = event.target;

  if (value > 800) {
    value = 800;
  } else if (value < 500) {
    value = 500;
  }

  event.target.value = value;

  $canvas.width = value;
  $canvas.height = value;

  const [cw, ch] = [$canvas.width / 2, $canvas.height / 2];

  ctx.translate(cw, ch);
  ctx.rotate((-90 * Math.PI) / 180);
  ctx.rotate((angl * Math.PI) / 180);
  ctx.translate(-cw, -ch);
  draw(0);

  localStorage.setItem("spinner-size", value);
};

const resizeFont = (event) => {
  let { value } = event.target;

  if (value > 30) {
    value = 30;
  } else if (value < 15) {
    value = 15;
  }

  event.target.value = value;
  fontSize = value;

  draw(0);

  localStorage.setItem("font-size", value);
};

$spinnerSize.addEventListener("change", resizeSpinner);
$fontSize.addEventListener("change", resizeFont);

const initSize = () => {
  const spinnerSize = localStorage.getItem("spinner-size") ?? 500;
  const fontSize = localStorage.getItem("font-size") ?? 15;
  $spinnerSize.value = spinnerSize;
  $canvas.width = spinnerSize;
  $canvas.height = spinnerSize;
  $fontSize.value = fontSize;
  draw(0);
};

document.addEventListener("DOMContentLoaded", initSize);
