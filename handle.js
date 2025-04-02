const $canvas = document.querySelector("canvas");
const ctx = $canvas.getContext("2d");

const PRODUCTS = new Map([
  ["R.E.P.O", 1],
  ["Terraria", 3],
  ["Overwatch", 3],
  ["Witcher", 3],
  ["GTA5", 3],
]);

const COLORS = ["#dc0936", "#e6471d", "#209b6c", "#169ed8", "#87207b", "#2d2072"];

const draw = (angle) => {
  const [cw, ch] = [$canvas.width / 2, $canvas.height / 2];
  const total = PRODUCTS.values().reduce((a, b) => a + b, 0);
  const radian = ((360 / total) * Math.PI) / 180;

  PRODUCTS.keys().forEach((name, i) => {
    const arc = radian * PRODUCTS.get(name);

    ctx.beginPath();
    ctx.fillStyle = COLORS[i];
    ctx.moveTo(cw, ch);
    ctx.arc(cw, ch, cw - 10, angle, angle + arc);
    ctx.fill();
    ctx.closePath();

    ctx.textAlign = "center";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "13px Arial";

    ctx.save();
    ctx.translate(
      cw + Math.cos(angle + arc / 2) * (cw - 120),
      ch + Math.sin(angle + arc / 2) * (ch - 120)
    );
    ctx.rotate(angle + arc / 2 + Math.PI * 2);
    ctx.fillText(name, 0, 0);
    ctx.restore();

    angle += arc;
  });
};

const resizing = () => {
  RESULT.slice(0, RESULT.length);

  PRODUCTS.keys().forEach((name) => {
    RESULT.push(...Array.from({ length: PRODUCTS.get(name) }).fill(name));
  });
};

const addProduct = (name, length) => {
  PRODUCTS.set(name, PRODUCTS.has(name) ? PRODUCTS.get(name) + length : length);
  draw(0);
};

const rotate = () => {
  $canvas.style.transform = `initial`;
  $canvas.style.transition = `initial`;

  setTimeout(() => {
    const total = PRODUCTS.values().reduce((a, b) => a + b, 0);

    const pick = Math.floor(Math.random() * total);
    const arc = 360 / total;
    const rotate = 360 - arc * pick + 3600 + arc / 3;

    $canvas.style.transform = `rotate(${rotate}deg)`;
    $canvas.style.transition = `2s ease-out`;
  }, 1);
};

draw(0);
