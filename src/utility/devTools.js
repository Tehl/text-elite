function warning(message) {
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(message);
  } else {
    throw new Error(message);
  }
}

export { warning };
