import { roundToNearest } from "../../utility/math";
import { int32_t } from "../../utility/c_types";
import { stringBeginsWith } from "../../utility/strings";

// ref: distance()
// calculates the distance between two systems
function distanceBetween(a, b) {
  // prettier-ignore
  return roundToNearest(
    4 * Math.sqrt(
      int32_t(
        (a.x - b.x) * (a.x - b.x) + ((a.y - b.y) * (a.y - b.y)) / 4
      )
    )
  );
}

function findNearestByName(galaxy, currentSystem, targetName) {
  const matchingSystems = galaxy
    .filter(x => stringBeginsWith(x.name, targetName))
    .map(x => ({
      system: x,
      distance: distanceBetween(currentSystem, x)
    }));

  matchingSystems.sort((a, b) => a.distance - b.distance);

  return matchingSystems[0] ? matchingSystems[0].system : null;
}

export { distanceBetween, findNearestByName };
