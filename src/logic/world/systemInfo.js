import { governmentTypes, economyTypes } from "../../data/strings";
import getSystemDescription from "../worldGen/goatSoup";

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

export { getFullSystemInfo };
