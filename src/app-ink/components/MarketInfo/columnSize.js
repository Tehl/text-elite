const columnSize = {
  name: 16,
  price: 6,
  available: 6,
  owned: 6
};

export default {
  ...columnSize,
  total: Object.keys(columnSize)
    .map(x => columnSize[x])
    .reduce((a, b) => a + b, 0)
};
