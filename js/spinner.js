const $canvas = document.querySelector("canvas");
const ctx = $canvas.getContext("2d");

const $rotateButton = document.querySelector(".rotate-btn");
const $stopButton = document.querySelector(".stop-btn");

let resultAngle = 0;
let isSpinning = false;

const getTotalSize = () => {
  return products.values().reduce((a, b) => a + b.size, 0);
};

const getImage = () => {
  const date = new Date();
  const today = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  const link = document.createElement("a");

  const image = $canvas.toDataURL("image/jpeg");
  const myImage = new Image();
  myImage.src = image;

  myImage.onload = () => {
    const $imgCanavas = document.createElement("canvas");
    const imgCtx = $imgCanavas.getContext("2d");

    $imgCanavas.width = $canvas.width;
    $imgCanavas.height = $canvas.height;

    imgCtx.translate($imgCanavas.width / 2, $imgCanavas.height / 2);
    imgCtx.rotate((resultAngle * Math.PI) / 180);
    imgCtx.translate(-$imgCanavas.width / 2, -$imgCanavas.height / 2);

    imgCtx.drawImage(myImage, 0, 0, $imgCanavas.width, $imgCanavas.height);

    link.href = $imgCanavas.toDataURL("image/jpeg");
    link.download = `쁘밍's_룰렛_${today}`;
    link.click();
  };
};

const draw = (angle) => {
  const [cw, ch] = [$canvas.width / 2, $canvas.height / 2];
  const totalSize = getTotalSize();
  const radian = ((360 / totalSize) * Math.PI) / 180;

  const keys = [...products.keys()];

  for (let i = 0; i < keys.length; i++) {
    const arc = radian * products.get(keys[i]).size;

    ctx.beginPath();
    ctx.fillStyle = products.get(keys[i]).color;
    ctx.moveTo(cw, ch);
    ctx.arc(cw, ch, cw - 10, angle, angle + arc);
    ctx.fill();
    ctx.closePath();

    ctx.textAlign = "left";
    ctx.fillStyle = "#000000";
    ctx.font = "bold 15px Arial";
    ctx.strokeStyle = "#949494";
    ctx.stroke();

    ctx.save();
    ctx.translate(
      cw + Math.cos(angle + arc / 2) * (cw - 120),
      ch + Math.sin(angle + arc / 2) * (ch - 120)
    );
    ctx.rotate(angle + arc / 2 + Math.PI * 2);
    ctx.fillText(products.get(keys[i]).name, -60, 5);
    ctx.restore();

    angle += arc;
  }
};

const rotate = () => {
  $canvas.style.animation = "1s infinite linear rotate";
  $rotateButton.style.opacity = 0;
  $rotateButton.style.pointerEvents = "none";
  $stopButton.style.opacity = 1;
  $stopButton.style.pointerEvents = "all";
  isSpinning = true;
};

const stop = () => {
  const length = viewItems.length;
  const degree = 360 / length;
  const random = Math.floor(Math.random() * viewItems.length);
  const rotate = -degree * random - Math.random() * (degree / 2) + 36000;

  $canvas.style.transform = "initial";
  $canvas.style.transition = "initial";
  $canvas.style.animation = "initial";

  setTimeout(() => {
    $canvas.style.transform = `rotate(${rotate}deg)`;
    $canvas.style.transition = "15s cubic-bezier(0, 0, 0, 1)";
  }, 1);

  setTimeout(() => {
    alert(viewItems[random]);
    $rotateButton.style.pointerEvents = "all";
    isSpinning = false;
  }, 16000);

  resultAngle = rotate;

  $rotateButton.style.opacity = 1;
  $stopButton.style.opacity = 0;
  $stopButton.style.pointerEvents = "none";
};

addEventListener("DOMContentLoaded", () => {
  const [cw, ch] = [$canvas.width / 2, $canvas.height / 2];

  ctx.translate(cw, ch);
  ctx.rotate((-90 * Math.PI) / 180);
  ctx.translate(-cw, -ch);

  draw(0);
  initProduct();
});
