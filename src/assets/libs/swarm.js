

class Swarm {
  constructor(offset) {
    this.offset = offset || 8;
  }

  swarm(boids) {
    for (let boid of boids) {
      boid.acsFunc(boids);
      boid.update();
    }
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
}
export default Swarm;