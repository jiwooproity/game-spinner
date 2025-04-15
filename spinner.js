const $canvas = document.querySelector("canvas");
const ctx = $canvas.getContext("2d");

const products = new Map([
  ["옵션 1", 1],
  ["옵션 2", 1],
]);

const viewItems = [];

const addProduct = (product) => {
  products.set(product, products.get(product) ? products.get(product) + 1 : 1);
  draw(0);
};

const plusSize = (product) => {
  products.set(product, products.get(product) + 1);
};

const subSize = (product) => {
  products.set(product, products.get(product) > 0 ? products.get(product) - 1 : 0);
};

const getTotalSize = () => {
  return products.values().reduce((a, b) => a + b, 0);
};

const draw = (angle) => {
  const [cw, ch] = [$canvas.width / 2, $canvas.height / 2];
  const totalSize = getTotalSize();
  const radian = ((360 / totalSize) * Math.PI) / 180;

  const keys = [...products.keys()];

  for (let i = 0; i < keys.length; i++) {
    const arc = radian * products.get(keys[i]);

    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    ctx.moveTo(cw, ch);
    ctx.arc(cw, ch, cw - 10, angle, angle + arc);
    ctx.fill();
    ctx.closePath();

    ctx.textAlign = "center";
    ctx.fillStyle = "#000000";
    ctx;
    ctx.font = "bold 15px Arial";
    ctx.strokeStyle = "#000000";
    ctx.stroke();

    ctx.save();
    ctx.translate(
      cw + Math.cos(angle + arc / 2) * (cw - 120),
      ch + Math.sin(angle + arc / 2) * (ch - 120)
    );
    ctx.rotate(angle + arc / 2 + Math.PI * 2);
    ctx.fillText(keys[i], 0, 0);
    ctx.restore();

    angle += arc;
  }
};

window.addEventListener("DOMContentLoaded", () => draw(0));
