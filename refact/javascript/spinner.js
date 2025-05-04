const $canvas = document.getElementById("spinner");
const ctx = $canvas.getContext("2d");

const $pointer = document.querySelector(".pointer");

class Spinner {
  constructor() {
    this.angle = 0;
    this.roll = 0;
    this.status = "rotate";
    this.fontSize = 15;
    this.rotate = this.rotate.bind(this); // Need to bind this for use requestAnimationFrame
    this.rotating = null;
    this.check = "";
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
      ctx.fillStyle = "#FFFFFF";
      ctx.moveTo(cw, ch);
      ctx.arc(cw, ch, cw - 2, angle, angle + arc);
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
      ctx.fillText(product.name, -60, 0);
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
        if (this.roll < 29) {
          this.roll += 0.5;
        }
        break;
      case "stop":
        if (this.roll > 0) {
          this.roll -= 0.05;
        } else {
          this.output();
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
  }

  bounce() {
    if (products.views[this.result] !== this.check) {
      this.check = products.views[this.result];

      setTimeout(() => {
        $pointer.classList.remove("bounce");
      }, 30);

      $pointer.classList.add("bounce");
      new Audio("audio/pointer.wav").play();
    }
  }

  output() {
    this.status = "rotate";
    console.log(products.views[this.result]);
    cancelAnimationFrame(this.rotating);
  }

  setFontSize(size = 15) {
    this.fontSize = size;
    this.draw();
  }

  setCanvasSize(size) {
    this.resize(size);
    this.init();
    this.draw();
  }

  resize(size) {
    $canvas.width = size;
    $canvas.height = size;
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
