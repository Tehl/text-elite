function c_string(length) {
  this._data = Array(length).fill(0);
}

c_string.prototype.get = function(idx) {
  if (idx >= 0 && idx < this._data.length) {
    return this._data[idx];
  }
  return 0;
};

c_string.prototype.set = function(idx, value) {
  if (idx >= 0 && idx < this._data.length) {
    this._data[idx] = value;
    return;
  }
  if (idx > 0 || value > 0) {
    throw new Error("out of range");
  }
};

c_string.prototype.getChar = function(idx) {
  return String.fromCharCode(this.get(idx));
};

c_string.prototype.setChar = function(idx, value) {
  this.set(idx, value.charCodeAt(0));
};

c_string.prototype.strlen = function() {
  let len = this._data.indexOf(0);
  if (len < 0) {
    len = this._data.length;
  }
  return len;
};

c_string.prototype.toString = function() {
  const len = this.strlen();
  return this._data
    .slice(0, len)
    .map(x => String.fromCharCode(x))
    .join("");
};

c_string.from = function(value) {
  if (value instanceof c_string) {
    return value;
  }

  const result = new c_string(value.length);
  for (let i = 0; i < value.length; i++) {
    result.setChar(i, value[i]);
  }
  return result;
};

module.exports = c_string;
