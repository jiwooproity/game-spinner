let beforeNumber = 0;

const COLORS = [
  "#F1E7E7",
  "#E69DB8",
  "#FFD0C7",
  "#FFFECE",
  "#8F87F1",
  "#C68EFD",
  "#E9A5F1",
  "#FED2E2",
  "#F7CFD8",
  "#F4F8D3",
  "#A6D6D6",
  "#8E7DBE",
];

const getColor = () => {
  const r = Math.floor(Math.random() * 127 + 128).toString(16);
  const g = Math.floor(Math.random() * 127 + 128).toString(16);
  const b = Math.floor(Math.random() * 127 + 128).toString(16);

  // let hex = 0;

  // while (true) {
  //   hex = Math.floor(Math.random() * COLORS.length);

  //   if (hex !== beforeNumber) {
  //     break;
  //   }
  // }

  // beforeNumber = hex;

  // return COLORS[hex];
  return `#${r}${g}${b}`;
};
