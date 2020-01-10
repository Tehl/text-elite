import { randomNamePairs } from "../../data/names";
import { descriptionRoot, descriptionOptions } from "../../data/goatSoup";
import { toProperCase } from "../../utility/strings";

// ref: gen_rnd_number()
// generates a random number based on seed information,
// and returns the seed for the next number in the sequence
function getRandomNumber(seed) {
  const nextSeed = {};

  let x = (seed.a * 2) & 0xff;
  let a = x + seed.c;

  if (seed.a > 127) {
    a++;
  }

  nextSeed.a = a & 0xff;
  nextSeed.c = x;

  a = Math.floor(a / 256); /* a = any carry left from above */
  x = seed.b;
  a = (a + x + seed.d) & 0xff;

  nextSeed.b = a;
  nextSeed.d = x;

  return {
    result: a,
    nextSeed
  };
}

// ref: goat_soup() 0xb0
// formats the system name in proper case
// e.g. LAVE -> Lave
function getPlanetName(systemInfo) {
  return toProperCase(systemInfo.name);
}

// ref: goat_soup() 0xb1
// formats the system name in proper case and appends the -ian suffix
// (e.g. LAVE -> Lavian)
function getPlanetaryOriginName(systemInfo) {
  let name = toProperCase(systemInfo.name);

  // trim trailing e/i
  const lastChar = name[name.length - 1];
  if (lastChar === "e" || lastChar === "i") {
    name = name.substring(0, name.length - 1);
  }

  return name + "ian";
}

// ref: goat_soup() 0xb2
// generates a random name in proper case
function getRandomName(seed) {
  let nextSeed = seed;
  let rnd;

  ({ result: rnd, nextSeed } = getRandomNumber(nextSeed));

  let length = rnd & 3;
  const chars = [];
  for (let i = 0; i <= length; i++) {
    ({ result: rnd, nextSeed } = getRandomNumber(nextSeed));

    const x = rnd & 0x3e;
    chars.push(randomNamePairs[x], randomNamePairs[x + 1]);
  }

  return {
    result: toProperCase(chars.join("")),
    nextSeed
  };
}

// ref: goat_soup() 0xa4
// recursively generates a descriptive string segment by selecting
// a new input pattern from descriptionOptions based on the random seed
function getInnerSoup(c, systemInfo, seed) {
  let nextSeed = seed;

  let rnd;
  ({ result: rnd, nextSeed } = getRandomNumber(nextSeed));

  const nextPattern =
    descriptionOptions[c - 0x81][
      (rnd >= 0x33) + (rnd >= 0x66) + (rnd >= 0x99) + (rnd >= 0xcc)
    ];

  return generateGoatSoup(nextPattern, systemInfo, nextSeed);
}

// ref: goat_soup()
// generates a descriptive string segment matching the input pattern
// by replacing special characters with lookups from descriptionOptions
// or other data about the system
function generateGoatSoup(inputPattern, systemInfo, seed) {
  let nextSeed = seed;
  let result = [];

  for (let i = 0; i < inputPattern.length; i++) {
    const c = inputPattern.charCodeAt(i);

    if (c < 0x80) {
      // use the basic ascii character
      result.push(inputPattern[i]);
    } else if (c <= 0xa4) {
      // recursively append a substring from the descriptionOptions set
      let innerSoup;
      ({ result: innerSoup, nextSeed } = getInnerSoup(c, systemInfo, nextSeed));
      result.push(innerSoup);
    } else {
      switch (c) {
        case 0xb0:
          // <planet_name>
          result.push(getPlanetName(systemInfo));
          break;

        case 0xb1:
          // <planet_name>ian
          result.push(getPlanetaryOriginName(systemInfo));
          break;

        case 0xb2:
          // random name
          let name;
          ({ result: name, nextSeed } = getRandomName(nextSeed));
          result.push(name);
          break;

        default:
          throw new Error("Unexpected character in input string: " + c);
      }
    }
  }

  return {
    result: result.join(""),
    nextSeed
  };
}

// generates a short description of a planet based on the system's seed data
function getSystemDescription(systemInfo) {
  const goatSoup = generateGoatSoup(
    descriptionRoot,
    systemInfo,
    systemInfo.goatsoupseed
  );
  return goatSoup.result;
}

export default getSystemDescription;

export const _internals = { generateGoatSoup };
