const generate = (hex) => {
  hex = hex.replace(/^\s*#|\s*$/g, "");

  // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
  if (hex.length == 3) {
    hex = hex.replace(/(.)/g, "$1$1");
  }

  var r = parseInt(hex.substr(0, 2), 16),
    g = parseInt(hex.substr(2, 2), 16),
    b = parseInt(hex.substr(4, 2), 16);

  return (
    "#" +
    (0 | ((1 << 8) + r + ((256 - r) * 60) / 100)).toString(16).substr(1) +
    (0 | ((1 << 8) + g + ((256 - g) * 60) / 100)).toString(16).substr(1) +
    (0 | ((1 << 8) + b + ((256 - b) * 60) / 100)).toString(16).substr(1)
  );
};

const getColor = () => {
  const r = Math.floor(Math.random() * 127 + 128).toString(16);
  const g = Math.floor(Math.random() * 127 + 128).toString(16);
  const b = Math.floor(Math.random() * 127 + 128).toString(16);
  return generate(`#${r}${g}${b}`);
};
