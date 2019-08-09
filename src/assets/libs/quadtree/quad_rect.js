

class QRect {
  // Width and Height (w, h) are from the center point (x, y) to the edge
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
};
export default QRect;