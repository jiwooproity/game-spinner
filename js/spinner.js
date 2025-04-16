const $canvas = document.querySelector("canvas");
const ctx = $canvas.getContext("2d");

const getTotalSize = () => {
  return products.values().reduce((a, b) => a + b.size, 0);
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
    ctx.strokeStyle = "#000000";
    ctx.stroke();

    ctx.save();
    ctx.translate(
      cw + Math.cos(angle + arc / 2) * (cw - 120),
      ch + Math.sin(angle + arc / 2) * (ch - 120)
    );
    ctx.rotate(angle + arc / 2 + Math.PI * 2);
    ctx.fillText(keys[i], -30, 5);
    ctx.restore();

    angle += arc;
  }
};

const rotate = () => {
  const length = viewItems.length;
  const degree = 360 / length;
  const random = Math.floor(Math.random() * viewItems.length);
  const rotate = -degree * random - Math.random() * (degree / 2) + 36000;

  $canvas.style.transform = "initial";
  $canvas.style.transition = "initial";

  setTimeout(() => {
    $canvas.style.transform = `rotate(${rotate}deg)`;
    $canvas.style.transition = "15s cubic-bezier(0, 0, 0, 1)";
  }, 1);

  setTimeout(() => {
    alert(viewItems[random]);
  }, 16000);
};

addEventListener("DOMContentLoaded", () => {
  draw(0);
  initProduct();
});
