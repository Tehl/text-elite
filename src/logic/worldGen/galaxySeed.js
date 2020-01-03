// ref: rotatel()
// rotate 8 bit number leftwards
function rotatel(x) {
  let temp = x & 128;
  return 2 * (x & 127) + (temp >> 7);
}

// ref: twist()
// mutates a seed component by rotating bits
function twist(x) {
  return 256 * rotatel(x >> 8) + rotatel(x & 255);
}

// ref: nextgalaxy()
// create next seed from previous seed
function nextGalaxy(seed) {
  return {
    w0: twist(seed.w0),
    w1: twist(seed.w1),
    w2: twist(seed.w2)
  };
}

// ref: buildgalaxy()
// create seed for galaxy by twisting the default seed.
// applies nextGalaxy() once for galaxy 2, twice for galaxy 3 etc.
// galaxy 8 should be the same as galaxy 1
function getGalaxySeed(galaxyNum, initialSeed) {
  let seed = { ...initialSeed };
  for (let i = 1; i < galaxyNum; i++) {
    seed = nextGalaxy(seed);
  }
  return seed;
}

export default getGalaxySeed;
