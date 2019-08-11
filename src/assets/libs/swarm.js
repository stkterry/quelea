import { Rand } from "./util";
import Boid from "./boid";

import QuadTree from "./quadtree/quadtree";
import Rect from "./quadtree/quad_rect";
import Point from "./quadtree/quad_point";
import Obstacle from "./obstacle";

const CONFIG = () => {
  return {
    alignmentR: 50,
    cohesionR: 50,
    separationR: 50,
    avoidanceR: 50,
    maxAF: 0.2,
    maxCF: 0.2,
    maxSF: 0.2,
    maxAvF: 0.3,
    maxSpeed: 3,
    maxAcc: 0.1,
    size: 0,
    boidIcon: null,
    boidIconSize: 10,
    alignmentFalloff: function (boid, otherBoid) {
      const dist = boid.pos.distTo(otherBoid.pos);
      if (dist < this.alignmentR && dist > 0) return 1;
      else return 0;
    },
    cohesionFalloff: function (boid, otherBoid) {
      const dist = boid.pos.distTo(otherBoid.pos);
      if (dist < this.cohesionR && dist > 0) return 1;
      else return 0;
    },
    separationFalloff: function (boid, otherBoid) {
      const dist = boid.pos.distTo(otherBoid.pos);
      if (dist < this.separationR && dist > 0) return dist;
      else return 0;
    },
    avoidanceFalloff: function (boid, obs) {
      const dist = boid.pos.distTo(obs.pos);
      if (dist < this.avoidanceR) return dist;
      else return 0;
    }
  }
}

class Swarm {
  constructor(offset, config) {
    this.offset = offset || 0;
    Object.assign(this, config || CONFIG());
    this.obstacles = [];
  }

  newSwarm(size, width, height) {
    const field = new Rect(width / 2, height / 2, width / 2, height / 2);
    this.obsQT = new QuadTree(field, 4);
    this.size = size;
    this.boids = new Array(size);
    for (let i = 0; i < size; i++) {
      this.boids[i] = new Boid({ x: Rand(0, width), y: Rand(0, height) });
    }
    return this.boids;
  }

  newObstacle(x, y) {
    const obstacle = new Obstacle(x, y)
    this.obstacles.push(obstacle)
    this.obsQT.insert(new Point(obstacle.pos.x, obstacle.pos.y, obstacle));
  }
  deleteLastObstacle() {
    this.obsQT.sever();
    this.obstacles.pop();
    for (let obs of this.obstacles) {
      this.obsQT.insert(new Point(obs.pos.x, obs.pos.y, obs));
    }
  }
  deleteAllObstacles() {
    this.obsQT.sever();
    this.obstacles = [];
  }

  swarm(width, height) {
    let boidsNext = new Array(this.size);

    const max = Math.max(this.alignmentR, this.cohesionR, this.separationR);
    const field = new Rect(width / 2, height / 2, width / 2, height / 2);
    let boidsQT = new QuadTree(field, 4);
    for (let boid of this.activeBoids()) {
      boidsQT.insert(new Point(boid.pos.x, boid.pos.y, boid))
    }

    for (let i = 0, len = this.size; i < len; i++) {
      let neighborArea = new Rect(this.boids[i].pos.x, this.boids[i].pos.y, max, max);
      let obsArea = new Rect(this.boids[i].pos.x, this.boids[i].pos.y, this.avoidanceR, this.avoidanceR);

      let neighborQuery = boidsQT.query(neighborArea);
      let obsQuery = this.obsQT.query(obsArea);

      boidsNext[i] = this.boids[i].acsFunc(this, neighborQuery, obsQuery);
      boidsNext[i].update(this);
    }

    Object.assign(this.boids, boidsNext);
  }


  swarmWrap(width, height) {
    const offset = this.offset;
    for (let boid of this.activeBoids()) {
      let { x, y } = boid.pos;
      if (x > width + offset) boid.pos.x = width - boid.pos.x - offset
      else if (x < -offset) boid.pos.x = width + boid.pos.x + offset;
      if (y > height + offset) boid.pos.y = height - boid.pos.y - offset
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

  drawObstacles(ctx) {
    for (let obs of this.obstacles) {
      ctx.circle(obs.pos.x, obs.pos.y, 8, "yellow");
    }
  }

  drawSwarmAdv(ctx) {
    let heading;
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
      ctx.restore();
    }
  }
}
export default Swarm;