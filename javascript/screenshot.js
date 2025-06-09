const createImage = (DOMImage, date) => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const image = new Image();

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      context.drawImage(image, 0, 0);

      context.textAlign = "right";
      context.textBaseline = "bottom";
      context.font = `bold 30px gothic`;

      const textWidth = context.measureText(`${date.fullDate} ${date.nowTime}`).width;

      context.fillStyle = "#000000";
      context.fillRect(canvas.width - textWidth - 30, canvas.height - 50, textWidth + 30, 50);
      context.fill();

      context.fillStyle = "#FFFFFF";
      context.fillText(`${date.fullDate} ${date.nowTime}`, canvas.width - 15, canvas.height - 10);

      resolve(canvas.toDataURL());
    };

    image.src = DOMImage;
  });
};

const screenshot = async () => {
  const today = new Day();

  const captureTarget = document.querySelector(".container");
  const getCaptureOfDOM = await html2canvas(captureTarget, { scale: 2 });
  const image = await createImage(getCaptureOfDOM.toDataURL("image/png"), today);

  const link = document.createElement("a");
  link.href = image;
  link.download = `쁘밍의_게임_룰렛_${today.fullDate}.png`;
  link.click();
};
