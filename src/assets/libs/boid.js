import Vec from "./vec";

class Boid {
  constructor(pos, vel, acc) {
    this.pos = new Vec(pos.x, pos.y);
    this.vel = vel ? new Vec(vel.x, vel.y) : Vec.randFromMag(2, 3);
    this.acc = acc ? new Vec(acc.x, acc.y) : new Vec();
    this.avgNeighbors = 0;
  }

  acsFunc(swarm, boids, obstacles) {
    let alignmentAvg = new Vec();
    let cohesionAvg = new Vec();
    let seperationAvg = new Vec();
    let sepDiff = 0;
    let falloff;

    let alignmentAffectedBy = 0;
    let cohesionAffectedBy = 0;
    let separationAffectedBy = 0;
    let avoidAffectedBy = 0;

    for (let boid of boids) {
      // alignment
      falloff = swarm.alignmentFalloff(this, boid);
      if (falloff > 0) {
        alignmentAvg.add(boid.vel);
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
        seperationAvg.add(sepDiff.div(falloff * falloff));
        separationAffectedBy += 1;
      }
    }

    // Avoidance
    let avoidAvg = new Vec();
    for (let obs of obstacles) {
      falloff = swarm.avoidanceFalloff(this, obs);
      if (falloff > 0) {

        sepDiff = Vec.sub(this.pos, obs.pos);
        if (Vec.angleBetween(this.vel, sepDiff) <= swarm.minApproachAngle ) {
          avoidAvg.add(sepDiff.div(falloff*falloff));
          avoidAffectedBy += 1;
        }
      }
    }


    // alignment
    if (alignmentAffectedBy > 0) {
      alignmentAvg
        // .div(alignmentAffectedBy)
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
        // .div(separationAffectedBy)
        .setMag(swarm.maxSpeed)
        .sub(this.vel)
        .limit(swarm.maxSF);
    }

    // Avoidance
    if (avoidAffectedBy > 0) {
      avoidAvg
        .div(avoidAffectedBy)
        .setMag(swarm.maxSpeed)
        .sub(this.vel)
        .limit(swarm.maxAvF)
    }
    let newBoid = new Boid(this.pos, this.vel, alignmentAvg.add(cohesionAvg).add(seperationAvg).add(avoidAvg));
    newBoid.avgNeighbors = (alignmentAffectedBy + cohesionAffectedBy + separationAffectedBy) / 3;
    return newBoid
  }

  update(swarm) {
    this.pos.add(this.vel);
    this.vel.add(this.acc).limit(swarm.maxSpeed);
  }
}

export default Boid;