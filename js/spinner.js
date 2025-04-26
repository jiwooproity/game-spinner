const $canvas = document.getElementById("spinner");
const ctx = $canvas.getContext("2d");

const $resultText = document.querySelector(".result");

const $rotateButton = document.querySelector(".rotate");
const $stopButton = document.querySelector(".stop");

let resultAngle = 0;
let isSpinning = false;
let roll = 0;
let angl = 0;
let rotatating = null;
let stopped = false;

let fontSize = localStorage.getItem("font-size") ?? 15;

const getTotalSize = () => {
  return products.values().reduce((a, b) => a + b.size, 0);
};

const getImage = async () => {
  const date = new Date();
  const today = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

  const captureTarget = document.querySelector(".wrapper");
  const getCaptureOfDOM = await html2canvas(captureTarget, { scale: 4 });

  const link = document.createElement("a");
  link.href = getCaptureOfDOM.toDataURL("image/png");
  link.download = `쁘밍의_게임_룰렛_${today}.png`;
  link.click();
};

const draw = (angle) => {
  const [cw, ch] = [$canvas.width / 2, $canvas.height / 2];
  const totalSize = getTotalSize();
  const radian = ((360 / totalSize) * Math.PI) / 180;

  const keys = [...products.keys()];

  ctx.clearRect(0, 0, 800, 800);

  for (let i = 0; i < keys.length; i++) {
    const arc = radian * products.get(keys[i]).size;

    ctx.beginPath();
    ctx.fillStyle = products.get(keys[i]).color;
    ctx.moveTo(cw, ch);
    ctx.arc(cw, ch, cw - 10, angle, angle + arc);
    ctx.fill();
    ctx.closePath();

    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "#000000";
    ctx.stroke();

    angle += arc;
  }

  for (let i = 0; i < keys.length; i++) {
    const arc = radian * products.get(keys[i]).size;

    ctx.save();
    ctx.translate(
      cw + Math.cos(angle + arc / 2) * (cw / 2),
      ch + Math.sin(angle + arc / 2) * (ch / 2)
    );
    ctx.rotate(angle + arc / 2 + Math.PI * 2);
    ctx.textAlign = "left";
    ctx.fillStyle = "#000000";
    ctx.textBaseline = "middle";
    ctx.font = `bold ${fontSize}px gothic`;
    ctx.fillText(products.get(keys[i]).name, -60, 1);
    ctx.restore();

    angle += arc;
  }
};

const controlSpinBtn = (switched) => {
  $rotateButton.style.opacity = switched ? 0 : 1;
  $rotateButton.style.pointerEvents = switched ? "none" : "all";
  $stopButton.style.opacity = switched ? 1 : 0;
  $stopButton.style.pointerEvents = switched ? "all" : "none";
};

const rotate = () => {
  controlSpinBtn(true);
  closeSubMenu();

  const [cw, ch] = [$canvas.width / 2, $canvas.height / 2];

  if (stopped) {
    if (roll > 5) {
      roll -= 0.05;
    } else if (roll > 1) {
      roll -= 0.005;
    } else if (roll > 0) {
      roll -= 0.002;
    } else {
      outputResult();
      return;
    }

    angl += roll;
  } else {
    if (roll < 36) {
      roll += 1;
    }

    angl += roll;
  }

  ctx.translate(cw, ch);
  ctx.rotate((roll * Math.PI) / 180);
  ctx.translate(-cw, -ch);

  const result = calculateResult();
  $resultText.innerText = `${viewItems[result]}`;

  draw(0);
  rotatating = requestAnimationFrame(rotate);
};

const calculateResult = () => {
  const totalRap = angl % 360;
  const avgAngle = 360 / viewItems.length;
  const notMarginTotal = 360 - totalRap;
  const result = Math.floor(notMarginTotal / avgAngle);
  return result;
};

const outputResult = () => {
  stopped = false;
  controlSpinBtn(false);

  const result = calculateResult();
  $resultText.innerText = `${viewItems[result]}`;

  congratulations();
};

const stop = () => {
  stopped = true;
};

addEventListener("DOMContentLoaded", () => {
  const [cw, ch] = [$canvas.width / 2, $canvas.height / 2];

  ctx.translate(cw, ch);
  ctx.rotate((-90 * Math.PI) / 180);
  ctx.translate(-cw, -ch);

  draw(0);
  initProduct();
});
