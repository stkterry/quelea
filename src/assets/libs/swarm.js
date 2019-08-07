import Boid from "../../assets/libs/boid";
import { Rand, arrWin } from "./util";
class Swarm {
  constructor(offset, gridWidth) {
    this.offset = offset || 0;
    this.gridWidth = gridWidth || 20;
  }

  newSwarm(size, width, height) {
    // create boids
    const boids = new Array(size);
    for (let i = 0; i < size; i++) {
      boids[i] = new Boid({x: Rand(0, width), y: Rand(0, height)});
    }

    // create cells
    this.cells = []
    this.cols = width/this.gridWidth;
    this.rows = height/this.gridWidth;
    let cellCount = this.cols * this.rows;
    for (let i = 0; i < cellCount; i++) {
      this.cells.push([]);
    }

    // populate cells
    for (let boid of boids) {
      let i = Math.floor(boid.pos.x) % this.gridWidth;
      let j = Math.floor(boid.pos.y) % this.gridWidth;
      this.cells[j * this.cols + i].push(boid);
    }

    // this.swarm2();
    return boids;
  }

  swarm2() {
    let nextCells = new Array(this.cells.length);
    for (let i  = 0, len = this.cells.length; i < len; i++) nextCells[i] = [];

    let a = Math.max(Boid.alignmentR, Boid.cohesionR, Boid.separationR);
    a = Math.ceil(a / this.gridWidth);
    let win, n;

    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        win = arrWin(i, j, a, this.rows, this.cols, this.cells)

        n = j * this.cols + i;
        // console.log(i, j, n, this.rows, this.cols, this.cells[n], this.cells.length)
        for (let boid of this.cells[n]) {
          let neighbors = win.flat(1);
          let newBoid = boid.acsFunc(neighbors);
          newBoid.update();

          this.wrapOne(800, 500, newBoid);
          let k = Math.floor(newBoid.pos.x) % this.gridWidth;
          let m = Math.floor(newBoid.pos.y) % this.gridWidth;

          // console.log(k, m, m * this.cols + k)
          nextCells[m * this.cols + k].push(newBoid);
        }

      }
    }

    this.cells = Object.assign([], nextCells);
    return this.cells.flat(1);
  }

  swarm(boids) {

    let boidsNext = new Array(boids.length);

    for (let i = 0, len = boids.length; i < len; i++) {
      boidsNext[i] = boids[i].acsFunc(boids);
      boidsNext[i].update();
    }
    Object.assign(boids, boidsNext);
  }

  drawSwarm(ctx, boids) {
    for (let boid of boids) {
      ctx.circle(boid.pos.x, boid.pos.y, 8, "yellow");
    }
  }

  drawSwarmAdv(ctx, boids) {
    const pointer = document.getElementById("pointer");
    let heading;
    for ( let boid of boids) {
      ctx.save();
      heading = boid.vel.getHeading();
      ctx.translate(boid.pos.x, boid.pos.y);
      ctx.rotate( heading );
      ctx.drawImage(pointer, -10/2, -10/2, 10, 10);
      ctx.rotate(-heading);
      ctx.translate(-boid.pos.x, -boid.pos.y);
      ctx.restore();
    }
  }

  wrap(width, height, boids) {
    for (let boid of boids) {
      let { x, y } = boid.pos;
      const offset = this.offset;
      if (x > width + offset) boid.pos.x = -offset
      else if (x < -offset) boid.pos.x = width + offset;
      if (y > height + offset) boid.pos.y = -offset
      else if (y < -offset) boid.pos.y = height + offset;
    }
  }

  wrapOne(width, height, boid) {
      let { x, y } = boid.pos;
      const offset = this.offset;
      if (x > width + offset) boid.pos.x = -offset
      else if (x < -offset) boid.pos.x = width + offset;
      if (y > height + offset) boid.pos.y = -offset
      else if (y < -offset) boid.pos.y = height + offset;
  }


}
export default Swarm;