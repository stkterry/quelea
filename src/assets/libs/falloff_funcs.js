// alignmentFalloff: function(boid, otherBoid) {
//   const dist = boid.pos.distTo(otherBoid.pos);
//   if (dist < this.alignmentR && dist > 0) return 1;
//   else return 0;
// },
// cohesionFalloff: function(boid, otherBoid) {
//   const dist = boid.pos.distTo(otherBoid.pos);
//   if (dist < this.cohesionR && dist > 0) return 1;
//   else return 0;
// },
// separationFalloff: function(boid, otherBoid) {
//   const dist = boid.pos.distTo(otherBoid.pos);
//   if (dist < this.separationR && dist > 0) return dist;
//   else return 0;
// }


const falloffs = {
  constant: function(dist, R) {
    if (dist < R && dist > 0) return 1;
    else return 0;
  },
  linear: function(dist, R) {
    if (dist < R && dist > 0) return 1/dist;
    else return 0;
  },
  expDecay: function(dist, R) {
    if (dist < R && dist > 0) return Math.exp(-dist/R);
    else return 0;
  },
  expImpulse: function(dist, R) {
    if (dist < R && dist > 0) {
      const h = dist * R;
      return h * Math.exp(1-h);
    } else return 0;
  }
}

export default falloffs;