import { governmentTypes, economyTypes } from "/data/strings";
import getSystemDescription from "/logic/worldGen/goatSoup";

function getFullSystemInfo(system) {
  return [
    `System: ${system.name}`,
    `Position: (${system.x},${system.y})`,
    `Economy: (${system.economy}) ${economyTypes[system.economy]}`,
    `Government: (${system.govtype}) ${governmentTypes[system.govtype]}`,
    `Tech Level: ${system.techlev + 1}`,
    `Turnover: ${system.productivity}`,
    `Radius: ${system.radius}`,
    `Population: ${system.population >> 3} Billion`,
    getSystemDescription(system)
  ];
}

function getShortSystemInfo(system) {
  const name = system.name.padStart(10);
  const techLevel = String(system.techlev + 1).padStart(2);
  const economy = economyTypes[system.economy].padStart(12);
  const govType = governmentTypes[system.govtype].padStart(15);
  return `${name} TL: ${techLevel} ${economy} ${govType}`;
}

export { getFullSystemInfo, getShortSystemInfo };
