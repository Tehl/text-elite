import rules from "../rules";
import getGalaxySeed from "./galaxySeed";
import getSystemSeed from "./systemSeed";
import buildSystem from "./buildSystem";

// ref: buildgalaxy
// populates the galaxy with the specified number of systems
function buildGalaxyFromSeed(seed, size) {
  const galaxy = [];

  let current = seed;
  let next;
  for (let i = 0; i < size; i++) {
    ({ current, next } = getSystemSeed(current));
    galaxy[i] = buildSystem(current);
    galaxy[i].systemId = i;
    current = next;
  }

  return galaxy;
}

// builds the specified galaxy and fills it with systems
function buildGalaxy(galaxyNum) {
  const seed = getGalaxySeed(galaxyNum, rules.galaxySeed);
  return buildGalaxyFromSeed(seed, rules.galaxySize);
}

export default buildGalaxy;
