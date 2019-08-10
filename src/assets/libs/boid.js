import Vec from "./vec";

class Boid {
  constructor(pos, vel, acc) {
    this.pos = new Vec(pos.x, pos.y);
    this.vel = vel ? new Vec(vel.x, vel.y) : Vec.randFromMag(2, 3);
    this.acc = acc ? new Vec(acc.x, acc.y) : new Vec();
  }

  acsFunc(swarm, boids) {
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
      falloff = swarm.alignmentFalloff(this, boid);
      if (falloff > 0) {
        alignmentAvg.add(Vec.scale(boid.vel, falloff));
        alignmentAffectedBy += 1;
      }

      // cohesion
      falloff = swarm.cohesionFalloff(this, boid);
      if (falloff > 0) {
        cohesionAvg.add(Vec.scale(boid.pos, falloff));
        cohesionAffectedBy += 1;
      }

      // separation
      falloff = swarm.separationFalloff(this, boid);
      if (falloff > 0) {
        sepDiff = Vec.sub(this.pos, boid.pos);
        seperationAvg.add(sepDiff.scale(falloff));
        separationAffectedBy += 1;
      }
    }

    // alignment
    if (alignmentAffectedBy > 0) {
      alignmentAvg
        .div(alignmentAffectedBy)
        .setMag(swarm.maxSpeed)
        .sub(this.vel)
        .limit(swarm.maxAF)
    }

    // cohesion
    if (cohesionAffectedBy > 0) {
      cohesionAvg
        .div(cohesionAffectedBy)
        .sub(this.pos)
        .setMag(swarm.maxSpeed)
        .sub(this.vel)
        .limit(swarm.maxCF)
    }

    // separation
    if (separationAffectedBy > 0) {
      seperationAvg
        .div(separationAffectedBy)
        .setMag(swarm.maxSpeed)
        .sub(this.vel)
        .limit(swarm.maxSF);
    }

    return new Boid(this.pos, this.vel, alignmentAvg.add(cohesionAvg).add(seperationAvg))
  }

  update(swarm) {
    this.pos.add(this.vel);
    this.vel.add(this.acc).limit(swarm.maxSpeed);
  }
}

export default Boid;