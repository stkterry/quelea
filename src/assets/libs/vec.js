const TWO_PI = Math.PI * 2;
const { atan2, sqrt, cos, sin, random } = Math;

class Vec {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }

  copy() { return new Vec(this.x, this.y) };

  get() { return {x: this.x, y: this.y } };

  getHeading() {
    return atan2(this.y, this.x);
  }

  getNorm() {
    return sqrt( this.x * this.x + this.y * this.y)
  }

  distTo(otherVec) {
    return sqrt( (this.x - otherVec.x)**2 + (this.y - otherVec.y)**2 );
  }

  normalize() {
    let norm = this.getNorm();
    this.x /= norm;
    this.y /= norm;
    return this;
  }

  scale(mag) {
    this.x *= mag;
    this.y *= mag;
    return this;
  }

  limit(mag) {
    if (this.getNorm() > mag) { this.setMag(mag)};
    return this;
  }

  div(mag) {
    this.x /= mag;
    this.y /= mag;
    return this;
  }

  add(otherVec) {
    this.x += otherVec.x;
    this.y += otherVec.y;
    return this;
  }

  sub(otherVec) {
    this.x -= otherVec.x;
    this.y -= otherVec.y;
    return this;
  }

  setMag(mag) {
    this.normalize();
    this.scale(mag);
    return this;
  }

  newUnit() {
    const norm = this.getNorm();
    return new Vec(this.x / norm, this.y / norm);
  }

  static sub(vec1, vec2) {
    return new Vec(vec1.x - vec2.x, vec1.y - vec2.y);
  }

  static scale(vec, fac) {
    return new Vec(vec.x * fac, vec.y * fac)
  }

  static randUnit() {
    const angle = random() * TWO_PI,
      x = cos(angle),
      y = sin(angle);
    return new Vec(x, y);
  };

  static unitFrom(vec) {
    const norm = vec.getNorm();
    return new Vec(vec.x / norm, vec.y / norm);
  };

  static randFromMag(minMag, maxMag) {
    if (!maxMag) {
      maxMag = minMag;
      minMag = 0;
    }
    const mag = (maxMag - minMag) * random() + minMag,
      angle = random() * TWO_PI,
      x = mag * cos(angle),
      y = mag * sin(angle);

    return new Vec(x, y);
  };

  static randFromDim(xmin = 0, ymin = 0, xmax, ymax) {
    const x = (xmax - xmin) * random() + xmin;
    const y = (ymax = ymin) * random() + ymin;
    return new Vec(x, y);
  };



}

// module.exports = {
//   Vec: Vec
// };

export default Vec;