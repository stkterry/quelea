import { Vec } from "./vec";

class Boid {
  constructor(pos, vel, acc, cell) {
    this.pos = new Vec(pos.x, pos.y);
    this.vel = Vec.randFromMag(2, 4);
    this.acc = new Vec();
  }

  static set attrs(attrs) {
    const { 
      alignmentR, cohesionR, separationR, 
      falloff, cohesionFalloff, separationFalloff, 
      maxAF, maxCF, maxSF, 
      maxSpeed 
    } = attrs;
    this._perception = alignmentR; // radius of influence
    this._cohesionR = cohesionR; // radius of clumping?
    this._separationR = separationR; // radius of avoidance
    this._falloff = falloff; // Falloff rate for alignment
    this._cohesionFalloff = cohesionFalloff; // Falloff rate for grouping together.
    this._separationFalloff = separationFalloff; // Falloff rate for avoidance;
    this._maxAF = maxAF; // Maximum sum force a boid can experience
    this._maxCF = maxCF; // Maximum sum force a boid can experience
    this._maxSF = maxSF; // Maximum sum force a boid can experience
    this._maxSpeed = maxSpeed; // Maximum speed a boid can travel
  }
  static get alignmentR() { return this._perception }
  static get cohesionR() { return this._cohesionR }
  static get separationR() { return this._separationR }
  static get maxAF() { return this._maxAF }
  static get maxCF() { return this._maxCF }
  static get maxSF() { return this._maxSF }
  static get falloff() { return this._falloff }
  static get cohesionFalloff() { return this._cohesionFalloff }
  static get separationFalloff() { return this._separationFalloff }
  static get maxSpeed() { return this._maxSpeed }

  swarm(boids) {
    let alignment = this.alignment(boids);
    let cohesion = this.cohesion(boids);
    let separation = this.separation(boids);

    this.acc = alignment.add(cohesion).add(separation)
  }

  alignment(boids) {
    let avg = new Vec();
    let falloff = 0;
    let affectedBy = 0;
    for (let boid of boids) {
      falloff = Boid.falloff(this, boid);
      if (falloff) {
        avg.add(Vec.scale(boid.vel, falloff))
        affectedBy += 1;
      }
    }
    if (affectedBy > 0) avg.div(affectedBy)
      .setMag(Boid.maxSpeed)
      .sub(this.vel)
      .limit(Boid.maxAF);
    return avg;
  }

  cohesion(boids) {
    let avg = new Vec();
    let falloff = 0;
    let affectedBy = 0;
    for (let boid of boids) {
      falloff = Boid.cohesionFalloff(this, boid);
      if (falloff) {
        avg.add(Vec.scale(boid.pos, falloff))
        affectedBy += 1;
      }
    }
    if (affectedBy > 0) avg.div(affectedBy)
    .sub(this.pos)
    .setMag(Boid.maxSpeed)
    .sub(this.vel)
    .limit(Boid.maxCF);
    return avg;
  }

  separation(boids) {
    let avg = new Vec();
    let falloff = 0;
    let affectedBy = 0;
    for (let boid of boids) {
      falloff = Boid.separationFalloff(this, boid);
      if (falloff) {
        let diff = Vec.sub(this.pos, boid.pos)
        avg.add(diff.scale(falloff))
        affectedBy += 1;
      }
    }
    if (affectedBy > 0) avg.div(affectedBy)
      .setMag(Boid.maxSpeed)
      .sub(this.vel)
      .limit(Boid.maxSF);
    return avg;
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc).limit(Boid.maxSpeed);
  }
}

Boid.attrs = {
  alignmentR: 30,
  cohesionR: 75,
  separationR: 50,
  maxAF: 0.2,
  maxCF: 0.2,
  maxSF: 0.2,
  maxSpeed: 4,
  maxAcc: 0.1,
  falloff: (boid, otherBoid) => {
    const dist = boid.pos.distTo(otherBoid.pos);
    if (dist < Boid.alignmentR && dist > 0) return 1;
    else return 0;
  },
  cohesionFalloff: (boid, otherBoid) => {
    const dist = boid.pos.distTo(otherBoid.pos);
    if (dist < Boid.cohesionR && dist > 0) return 1;
    else return 0;
  },
  separationFalloff: (boid, otherBoid) => {
    const dist = boid.pos.distTo(otherBoid.pos);
    if (dist < Boid.separationR && dist > 0) return dist/Boid.separationR;
    else return 0;
  }
}
export default Boid;