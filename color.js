let total = 10;

const getColors = (total) => {
  const randomColor = Math.floor(Math.random() * 360);
  const increment = 360 / total;

  const hsls = [];

  for (let i = 0; i < total; i++) {
    hsls.push(Math.round(randomColor + i * increment) % 360);
  }

  return hsls;
};
