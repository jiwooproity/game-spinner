const getColor = () => {
  const r = Math.floor(Math.random() * 127 + 128).toString(16);
  const g = Math.floor(Math.random() * 127 + 128).toString(16);
  const b = Math.floor(Math.random() * 127 + 128).toString(16);
  return `#${r}${g}${b}`;
};
