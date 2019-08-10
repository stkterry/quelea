import { Rand } from "./util";
import Boid from "./boid";

import QuadTree from "../libs/quadtree/quadtree";
import Rect from "../libs/quadtree/quad_rect";
import Point from "../libs/quadtree/quad_point";

import falloffs from "../libs/falloff_funcs";

const CONFIG = () => {
  return {
    alignmentR: 50,
    cohesionR: 50,
    separationR: 50,
    maxAF: 0.2,
    maxCF: 0.2,
    maxSF: 0.3,
    maxSpeed: 3,
    maxAcc: 0.1,
    size: 0,
    boidIcon: null,
    boidIconSize: 10,
    drawVectors: false,
    alignmentFalloff: function(boid, otherBoid) {
      const dist = boid.pos.distTo(otherBoid.pos);
      return falloffs.expImpulse(dist, this.alignmentR)
    },
    cohesionFalloff: function(boid, otherBoid) {
      const dist = boid.pos.distTo(otherBoid.pos);
      if (dist < this.cohesionR && dist > 0) return 1;
      else return 0;
    },
    separationFalloff: function(boid, otherBoid) {
      const dist = boid.pos.distTo(otherBoid.pos);
      if (dist < this.separationR && dist > 0) return 1/dist;
      else return 0;
    }
  }
}

class Swarm {
  constructor(offset, config) {
    this.offset = offset || 0;

    let newConfig = config || CONFIG();
    Object.assign(this, newConfig);
  }

  newSwarm(size, width, height) {
    this.size = size;
    this.boids = new Array(size);
    for (let i = 0; i < size; i++) {
      this.boids[i] = new Boid({x: Rand(0, width), y: Rand(0, height)});
    }
    return this.boids;
  }


  swarm(width, height) {
    let boidsNext = new Array(this.size);

    let max = Math.max(this.alignmentR, this.cohesionR, this.separationR);
    let field = new Rect(width / 2, height / 2, width/2, height/2);
    let qt = new QuadTree(field, 4);
    for (let boid of this.activeBoids()) {
      qt.insert(new Point(boid.pos.x, boid.pos.y, boid))
    }

    for (let i = 0, len = this.size; i < len; i++) {
      let search = new Rect(this.boids[i].pos.x, this.boids[i].pos.y, max, max);
      let result = qt.query(search);

      boidsNext[i] = this.boids[i].acsFunc(this, result);
      boidsNext[i].update(this);
    }

    Object.assign(this.boids, boidsNext);
  }


  swarmWrap(width, height) {
    const offset = this.offset;
    for (let boid of this.activeBoids()) {
      let { x, y } = boid.pos;
      if (x > width + offset) boid.pos.x = width - boid.pos.x -offset
      else if (x < -offset) boid.pos.x = width + boid.pos.x + offset;
      if (y > height + offset) boid.pos.y = height - boid.pos.y -offset
      else if (y < -offset) boid.pos.y = height + boid.pos.y + offset;
    }
  }

  drawSwarm(ctx) {
    for (let boid of this.activeBoids()) {
      ctx.circle(boid.pos.x, boid.pos.y, 8, "yellow");
    }
  }

  activeBoids() {
    return this.boids.slice(0, this.size);
  }

  drawSwarmAdv(ctx) {
    let heading;
    if (this.drawVectors) {
      for (let boid of this.activeBoids()) {
        ctx.save();
        heading = boid.vel.getHeading();
        ctx.translate(boid.pos.x, boid.pos.y);
        ctx.rotate(heading);
        ctx.drawImage(
          this.boidIcon,
          -this.boidIconSize / 2, -this.boidIconSize / 2,
          this.boidIconSize, this.boidIconSize
        );
        ctx.rotate(-heading);
        ctx.translate(-boid.pos.x, -boid.pos.y);

        // draw vectors now
        ctx.strokeStyle = "green";
        ctx.beginPath();
        ctx.moveTo(boid.pos.x, boid.pos.y);
        ctx.lineTo(boid.pos.x + boid.acc.x*100, boid.pos.y + boid.acc.y*100);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
      }
    } else {
      for ( let boid of this.activeBoids()) {
        ctx.save();
        heading = boid.vel.getHeading();
        ctx.translate(boid.pos.x, boid.pos.y);
        ctx.rotate( heading );
        ctx.drawImage(
          this.boidIcon, 
          -this.boidIconSize/2, -this.boidIconSize/2, 
          this.boidIconSize, this.boidIconSize
        );
        ctx.rotate(-heading);
        ctx.translate(-boid.pos.x, -boid.pos.y);
        ctx.restore();
      }
    }
  }
}
export default Swarm;