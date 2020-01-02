import { warning } from "../utility/devTools";

// searches a selector hierarchy and pulls all functions up to single root object.
// this allows us to provide a flat collection of all state selectors without the rest
// of the app needing to know the shape of the state, as long as all selectors
// are uniquely named.
function flattenSelectors(selectors) {
  const finalSelectors = {};

  function captureSelector(key, selector) {
    // warn about potential clobbering
    if (process.env.NODE_ENV !== "production") {
      if (finalSelectors[key]) {
        warning(`A selector named ${key} has already been captured`);
      }
    }
    finalSelectors[key] = selector;
  }

  Object.keys(selectors).forEach(key => {
    const selector = selectors[key];

    if (typeof selector === "function") {
      captureSelector(key, selector);
    } else {
      const innerSelectors = flattenSelectors(selector);
      Object.keys(innerSelectors).forEach(innerKey =>
        captureSelector(innerKey, innerSelectors[innerKey])
      );
    }
  });

  return finalSelectors;
}

export { flattenSelectors };
