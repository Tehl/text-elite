import { flattenSelectors } from "/utility/state";
import { globalSelectors } from "./global";

// we import the shaped collection of state selectors and flatten it
// into a single object, so that the rest of the app can import only
// the selector that it needs, without having to know the overall
// shape of the state.
// we can't use ES6 export syntax as this would require us to
// explicitly specify each export, so we use the older module.exports
// syntax to ensure each selector is available as a named export
// from this module.
module.exports = flattenSelectors(globalSelectors);
