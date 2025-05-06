const $canvas = document.getElementById("spinner");
const ctx = $canvas.getContext("2d");

const $pointer = document.querySelector(".pointer");
const $rotateButton = document.querySelector(".rotate-btn");
const $stopeButton = document.querySelector(".stop-btn");

const handleButton = (isRotate) => {
  if (isRotate) {
    $rotateButton.classList.add("spinner-btn-disabled");
    $stopeButton.classList.remove("spinner-btn-disabled");
  } else {
    $stopeButton.classList.add("spinner-btn-disabled");
    $rotateButton.classList.remove("spinner-btn-disabled");
  }
};

class Spinner {
  constructor() {
    this.angle = 0;
    this.roll = 0;
    this.status = "rotate";
    this.fontSize = storage.getItem("font-size") ?? 15;
    this.rotate = this.rotate.bind(this); // Need to bind this for use requestAnimationFrame
    this.rotating = null;
    this.check = "";
    this.timer = null;
  }

  get result() {
    const lap = this.angle % 360;
    const average = 360 / products.views.length;
    const total = 360 - lap;
    return Math.floor(total / average);
  }

  draw(angle = 0) {
    const [cw, ch] = [$canvas.width / 2, $canvas.height / 2];
    const size = products.size;
    const radian = ((360 / size) * Math.PI) / 180; // Average radian of total product

    ctx.clearRect(0, 0, $canvas.width, $canvas.height);

    for (const key of products.items.keys()) {
      const product = products.getItem(key);
      const arc = radian * product.size;

      ctx.beginPath();
      ctx.fillStyle = "#525252";
      ctx.moveTo(cw, ch);
      ctx.arc(cw, ch, cw, angle, angle + arc);
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.fillStyle = product.color;
      ctx.moveTo(cw, ch);
      ctx.arc(cw, ch, cw - 3, angle, angle + arc);
      ctx.fill();
      ctx.closePath();

      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "#000000";
      ctx.stroke();

      // Each product area
      ctx.beginPath();
      ctx.fillStyle = product.color;
      ctx.moveTo(cw, ch);
      ctx.arc(cw, ch, cw - 10, angle, angle + arc);
      ctx.fill();
      ctx.closePath();

      // Spinner border
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "#000000";
      ctx.stroke();

      angle += arc;
    }

    // Each product text area
    for (const key of products.items.keys()) {
      const product = products.getItem(key);
      const arc = radian * product.size;

      ctx.save();
      ctx.translate(
        cw + Math.cos(angle + arc / 2) * (cw / 2),
        ch + Math.sin(angle + arc / 2) * (ch / 2)
      );
      ctx.rotate(angle + arc / 2 + Math.PI * 2);
      ctx.textAlign = "left";
      ctx.fillStyle = "#000000";
      ctx.textBaseline = "middle";
      ctx.font = `bold ${this.fontSize}px gothic`;
      ctx.fillText(product.name, -60, 1);
      ctx.restore();

      angle += arc;
    }
  }

  stop() {
    this.status = "stop";
  }

  rotate() {
    const [cw, ch] = [$canvas.width / 2, $canvas.height / 2];

    switch (this.status) {
      case "rotate":
        if (this.roll < 36) {
          this.roll += 1;
        }
        break;
      case "stop":
        if (this.roll > 5) {
          this.roll -= 0.05;
        } else if (this.roll > 1) {
          this.roll -= 0.005;
        } else if (this.roll > 0) {
          this.roll -= 0.002;
        } else {
          setTimeout(this.output.bind(this), 1000);
          return;
        }
        break;
      default:
        break;
    }

    this.angle += this.roll;

    ctx.translate(cw, ch);
    ctx.rotate((this.roll * Math.PI) / 180);
    ctx.translate(-cw, -ch);

    this.bounce();
    this.draw();
    this.rotating = requestAnimationFrame(this.rotate);

    handleButton(true);
  }

  bounce() {
    if (products.views[this.result] !== this.check) {
      clearTimeout(this.timer);

      $pointer.style.transform = "translateX(-50%) rotate(-20deg)";

      this.timer = setTimeout(() => {
        $pointer.style.transform = "translateX(-50%) rotate(0deg)";
      }, 30);

      new SoundEffect("audio/pointer.wav").play();
      this.check = products.views[this.result];
    }
  }

  output() {
    this.status = "rotate";
    cancelAnimationFrame(this.rotating);
    handleButton(false);
    popup.show(products.views[this.result]);
    congratulations();
  }

  setFontSize(size = 15) {
    this.fontSize = size;
    this.draw();
    storage.setItem("font-size", size);
  }

  setCanvasSize(size) {
    this.resize(size);
    this.init();
    this.draw();
    storage.setItem("spinner-size", size);
  }

  resize(size) {
    $canvas.width = size;
    $canvas.height = size;

    const $spinnerMenu = document.querySelector(".spinner-menu");
    $spinnerMenu.style.maxHeight = `${size}px`;
  }

  init() {
    const [cw, ch] = [$canvas.width / 2, $canvas.height / 2];

    ctx.translate(cw, ch);
    ctx.rotate(((-90 + this.angle) * Math.PI) / 180);
    ctx.translate(-cw, -ch);

    this.draw();
  }
}

const spinner = new Spinner();

const init = () => {
  $canvas.width = storage.getItem("spinner-size") ?? 500;
  $canvas.height = storage.getItem("spinner-size") ?? 500;
};

document.addEventListener("DOMContentLoaded", init);
