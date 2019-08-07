const merge = require("lodash/merge")

const { random, floor } = Math;

const Rand = (min=0, max) => random() * (max - min)  + min;
const RandInt = (min=0, max) => floor( random() * (max - min + 1) + min);

const modWrap = (x, n) => (x % n + n) % n;

const arrWin = (i, j, a, rows, cols, arr) => {
  const i1 = i - a;
  const i2 = i + a + 1;
  const j1 = j - a;
  const j2 = j + a + 1;
  let k, m;
  let narr = []
  for (let ii = i1; ii < i2; ii++) {
    for (let jj = j1; jj < j2; jj++) {
      k = modWrap(ii, cols);
      m = modWrap(jj, rows);
      narr.push(arr[m * cols + k]);
    }
  }

  return narr;
}

const deepDup = (arr) => {
  let narr = new Array(arr.length);
  for (let i = 0, len = arr.length; i < len; i++) {
    narr[i] = merge({}, arr[i]);
  }
  return narr;
};

const deepDup2 = (arr) => {
  return JSON.parse(JSON.stringify(arr));
}


module.exports = {
  Rand: Rand,
  RandInt: RandInt,
  modWrap: modWrap,
  arrWin: arrWin,
  deepDup: deepDup,
  deepDup2: deepDup2
}