import Rect from "./quad_rect";

class QuadTree {
  constructor(bounds, n) {
    this.bounds = bounds;
    this.cap = n;
    this.points = new Array(n);
    this.numPoints = 0;
    this.divided = false;
  }

  subdivide() {
    let { x, y, w, h } = this.bounds;
    w = w/2;
    h = h/2;
    this.ne = new QuadTree(
      new Rect(x + w, y - h, w, h ),
      this.cap
    );
    this.se = new QuadTree(
      new Rect(x + w, y + h, w, h),
      this.cap 
    );
    this.sw = new QuadTree(
      new Rect(x - w, y + h, w, h),
      this.cap
    );
    this.nw = new QuadTree(
      new Rect(x - w, y - h, w, h),
      this.cap
    );

    this.divided = true;
  }

  insert(point) {
    if (!this.bounds.contains(point)) return false;

    if (this.numPoints < this.cap) {
      this.points[this.numPoints] = point;
      this.numPoints++;
      return true;
    }
    if (!this.divided) {
      this.subdivide();
    }

    if (
      this.ne.insert(point) ||
      this.se.insert(point) ||
      this.sw.insert(point) ||
      this.nw.insert(point)
    ) return true;
  }

  sever() {
    this.numPoints = 0;
    this.divided = false;
  }

  query(range, found = []) {
    if (!range.intersects(this.bounds)) return found;
      for (let i = 0; i < this.numPoints; i++) {
        if (range.contains(this.points[i])) found.push(this.points[i].dat);
      }

      if (this.divided) {
        this.ne.query(range, found);
        this.se.query(range, found);
        this.sw.query(range, found);
        this.nw.query(range, found);
      }
      return found; 
  }

}
export default QuadTree;