let r = 0;
let g = 0;
let b = 0;

const getColor = () => {
  r = Math.floor(Math.random() * 255);
  g = Math.floor(Math.random() * 255);
  b = Math.floor(Math.random() * 100);
  return `rgb(${r}, ${g}, ${b})`;
};
