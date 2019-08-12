const TWO_PI = Math.PI * 2;

CanvasRenderingContext2D.prototype.circle = function (x, y, r, c) {
  this.beginPath();
  this.arc(x, y, r, 0, TWO_PI);
  this.closePath();
  if (c) { this.fillStyle = c };
  this.fill();
}