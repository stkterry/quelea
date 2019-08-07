import { Vec } from "./vec";

class Boid {
  constructor(pos, vel, acc, cell) {
    this.pos = new Vec(pos.x, pos.y);
    this.vel = vel ? new Vec(vel.x, vel.y) : Vec.randFromMag(2, 3);
    this.acc = acc ? new Vec(acc.x, acc.y) : new Vec();
  }

  static set attrs(attrs) {
    const { 
      alignmentR, cohesionR, separationR, 
      alignmentFalloff, cohesionFalloff, separationFalloff, 
      maxAF, maxCF, maxSF, 
      maxSpeed 
    } = attrs;
    this._perception = alignmentR; // radius of influence
    this._cohesionR = cohesionR; // radius of clumping?
    this._separationR = separationR; // radius of avoidance
    this._alignmentFalloff = alignmentFalloff; // Falloff rate for alignment
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
  static get alignmentFalloff() { return this._alignmentFalloff }
  static get cohesionFalloff() { return this._cohesionFalloff }
  static get separationFalloff() { return this._separationFalloff }
  static get maxSpeed() { return this._maxSpeed }
  

  acsFunc(boids) {
    let alignmentAvg = new Vec();
    let cohesionAvg = new Vec();
    let seperationAvg = new Vec();
    let sepDiff = 0;
    let falloff;

    let alignmentAffectedBy = 0;
    let cohesionAffectedBy = 0;
    let separationAffectedBy = 0;

    for (let boid of boids) {
      // alignment
      falloff = Boid.alignmentFalloff(this, boid);
      if (falloff > 0) {
        alignmentAvg.add(Vec.scale(boid.vel, falloff));
        alignmentAffectedBy += 1;
      }

      // cohesion
      falloff = Boid.cohesionFalloff(this, boid);
      if (falloff > 0) {
        cohesionAvg.add(Vec.scale(boid.pos, falloff));
        cohesionAffectedBy += 1;
      }

      // separation
      falloff = Boid.separationFalloff(this, boid);
      if (falloff > 0) {
        sepDiff = Vec.sub(this.pos, boid.pos);
        seperationAvg.add(sepDiff.div(falloff));
        separationAffectedBy += 1;
      }
    }

    // alignment
    if (alignmentAffectedBy > 0) {
      alignmentAvg
        .div(alignmentAffectedBy)
        .setMag(Boid.maxSpeed)
        .sub(this.vel)
        .limit(Boid.maxAF)
    }

    // cohesion
    if (cohesionAffectedBy > 0) {
      cohesionAvg
        .div(cohesionAffectedBy)
        .sub(this.pos)
        .setMag(Boid.maxSpeed)
        .sub(this.vel)
        .limit(Boid.maxCF)
    }

    // separation
    if (separationAffectedBy > 0) {
      seperationAvg
        .div(separationAffectedBy)
        .setMag(Boid.maxSpeed)
        .sub(this.vel)
        .limit(Boid.maxSF);
    }

    return new Boid(this.pos, this.vel, alignmentAvg.add(cohesionAvg).add(seperationAvg))
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc).limit(Boid.maxSpeed);
  }
}

Boid.attrs = {
  alignmentR: 50,
  cohesionR: 50,
  separationR: 50,
  maxAF: 0.2,
  maxCF: 0.2,
  maxSF: 0.3,
  maxSpeed: 3,
  maxAcc: 0.1,
  alignmentFalloff: (boid, otherBoid) => {
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
    if (dist < Boid.separationR && dist > 0) return dist;
    else return 0;
  }
}
export default Boid;