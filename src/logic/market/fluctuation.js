// ref: mysrand()
function seedFluctuation(value) {
  return value - 1;
}

// ref: myrand()
function getFluctuation(seed) {
  let r;
  // prettier-ignore
  r = (((((((((((seed << 3) - seed) << 3)
      + seed) << 1) + seed) << 4)
      - seed) << 1) - seed) + 0xe60)
      & 0x7fffffff;

  return {
    fluctuation: r,
    nextSeed: seedFluctuation(r)
  };
}

export { getFluctuation, seedFluctuation };
