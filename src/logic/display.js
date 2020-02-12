function formatCash(value) {
  return (value / 10).toFixed(1);
}

function formatPrice(value) {
  return formatCash(value);
}

function formatDistance(value) {
  return (value / 10).toFixed(1);
}

function formatFuel(value) {
  return formatDistance(value);
}

export { formatCash, formatPrice, formatDistance, formatFuel };
