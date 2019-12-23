function bounded_integer(minValue, maxValue) {
  const range = maxValue - minValue;

  function range_t(value) {
    value = Math.floor(value);
    while (value > range_t.maxValue) {
      value -= range + 1;
    }
    while (value < range_t.minValue) {
      value += range + 1;
    }
    return value;
  }

  range_t.minValue = minValue;
  range_t.maxValue = maxValue;

  return range_t;
}

module.exports = {
  uint8_t: bounded_integer(0, 255),
  uint16_t: bounded_integer(0, 65535),
  int16_t: bounded_integer(-32768, 32767),
  int32_t: bounded_integer(-2147483648, 2147483647)
};
