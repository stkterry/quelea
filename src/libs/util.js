const merge = require("lodash/merge")

const { random, floor } = Math;

const Rand = (min=0, max) => random() * (max - min)  + min;
const RandInt = (min=0, max) => floor( random() * (max - min + 1) + min);


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
  deepDup: deepDup,
  deepDup2: deepDup2
}