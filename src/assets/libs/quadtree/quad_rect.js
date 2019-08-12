

class QRect {
  // Width and Height (w, h) are from the center point (x, y) to the edge
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  // Is some object within the QRect?
  contains (object) {
    return (
      object.pos.x >= this.x - this.w &&
      object.pos.x <= this.x + this.w &&
      object.pos.y >= this.y - this.h &&
      object.pos.y <= this.y + this.h
    )
  }

  intersects(range) {
    const { x, y, w, h } = range;
    return !(
      x - w > this.x + this.w ||
      x + w < this.x - this.w ||
      y - h > this.y + this.h ||
      y + h < this.y - this.h
    );
  }

};
export default QRect;