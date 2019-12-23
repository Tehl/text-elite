function atof(value) {
  let result = parseFloat(value);
  if (isNaN(result)) {
    result = 0;
  }
  return result;
}

function atoi(value) {
  let result = parseInt(value, 10);
  if (isNaN(result)) {
    result = 0;
  }
  return result;
}

module.exports = {
  atof,
  atoi,
  floor: Math.floor.bind(Math),
  sqrt: Math.sqrt.bind(Math)
};
