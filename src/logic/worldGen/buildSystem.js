import { systemNamePairs } from "../../data/names";

// ref: makesystem()
// construct a system name using the intermediate
// values generated while iterating the seed
function getSystemName(seed) {
  const longName = seed.w0 & 64;

  let chars = [
    systemNamePairs[seed.pair1],
    systemNamePairs[seed.pair1 + 1],
    systemNamePairs[seed.pair2],
    systemNamePairs[seed.pair2 + 1],
    systemNamePairs[seed.pair3],
    systemNamePairs[seed.pair3 + 1]
  ];

  if (longName) {
    chars = [
      ...chars,
      systemNamePairs[seed.pair4],
      systemNamePairs[seed.pair4 + 1]
    ];
  }

  return chars.join("").replace(/\./g, "");
}

// ref: makesystem()
// construct a seed to be used while generating
// the goat_soup string
function getGoatSoupSeed(seed) {
  return {
    a: seed.w1 & 0xff,
    b: seed.w1 >> 8,
    c: seed.w2 & 0xff,
    d: seed.w2 >> 8
  };
}

// ref: makesystem()
function buildSystem(seed) {
  const system = {
    name: getSystemName(seed),
    x: seed.w1 >> 8,
    y: seed.w0 >> 8
  };

  system.radius = 256 * (((seed.w2 >> 8) & 15) + 11) + system.x;

  system.govtype = (seed.w1 >> 3) & 7; // bits 3,4 &5 of w1

  system.economy = (seed.w0 >> 8) & 7; // bits 8,9 &A of w0
  if (system.govtype <= 1) {
    system.economy = system.economy | 2;
  }

  system.techlev = ((seed.w1 >> 8) & 3) + (system.economy ^ 7);
  system.techlev += system.govtype >> 1;
  if ((system.govtype & 1) == 1) {
    system.techlev += 1;
  }

  system.population = 4 * system.techlev + system.economy;
  system.population += system.govtype + 1;

  system.productivity = ((system.economy ^ 7) + 3) * (system.govtype + 4);
  system.productivity *= system.population * 8;

  system.goatsoupseed = getGoatSoupSeed(seed);

  return system;
}

export default buildSystem;
