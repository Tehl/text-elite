import { uint16_t } from "/utility/c_types";

// ref: tweakseed()
// rotates the components of an existing seed to produce the next
// value in the series
function nextSeed(seed) {
  const temp = {
    w0: uint16_t(seed.w0),
    w1: uint16_t(seed.w1),
    w2: uint16_t(seed.w2)
  };
  return {
    w0: temp.w1,
    w1: temp.w2,
    w2: uint16_t(temp.w0 + uint16_t(temp.w1 + temp.w2))
  };
}

// ref: makesystem()
// 4 'pairs' are captured from the intermediate seed states
// to be used when generating the system name
function generatePair(seed) {
  return 2 * ((seed.w2 >> 8) & 31);
}

// ref: makesystem()
// generating a system iterates the seed 4 times.
// we need to capture the initial seed as well as 4
// intermediate values, to be used by buildSystem.js
function getSystemSeed(seed) {
  const current = { ...seed };
  let next = { ...seed };

  current.pair1 = generatePair(next);
  next = nextSeed(next);

  current.pair2 = generatePair(next);
  next = nextSeed(next);

  current.pair3 = generatePair(next);
  next = nextSeed(next);

  current.pair4 = generatePair(next);
  next = nextSeed(next);

  return {
    current,
    next
  };
}

export default getSystemSeed;

export const _internals = { nextSeed, generatePair };
