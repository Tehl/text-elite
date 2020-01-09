function stringSplit(value, target) {
  const idx = value.indexOf(target);
  if (idx > -1) {
    return [value.substring(0, idx), value.substring(idx + 1)];
  }
  return [value, undefined];
}

function stringBeginsWith(value, target) {
  if (target.length < 1) {
    return false;
  }

  return value.toUpperCase().indexOf(target.toUpperCase()) === 0;
}

function toProperCase(value) {
  return value[0].toUpperCase() + value.substring(1).toLowerCase();
}

export { stringSplit, stringBeginsWith, toProperCase };
