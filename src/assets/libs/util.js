

const { random, floor } = Math;

const Rand = (min=0, max) => random() * (max - min)  + min;
const RandInt = (min=0, max) => floor( random() * (max - min + 1) + min);

module.exports = {
  Rand: Rand,
  RandInt: RandInt
}