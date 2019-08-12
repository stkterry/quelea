import Rect from "./quad_rect";

class QuadTree {
  constructor(bounds, n) {
    this.bounds = bounds;
    this.cap = n;
    this.objects = new Array(n);
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

  insert(object) {
    if (!this.bounds.contains(object)) return false;

    if (this.numPoints < this.cap) {
      this.objects[this.numPoints] = object;
      this.numPoints++;
      return true;
    }
    if (!this.divided) {
      this.subdivide();
    }

    if (
      this.ne.insert(object) ||
      this.se.insert(object) ||
      this.sw.insert(object) ||
      this.nw.insert(object)
    ) return true;
  }

  sever() {
    this.numPoints = 0;
    this.divided = false;
  }

  query(range, found = []) {
    if (!range.intersects(this.bounds)) return found;
      for (let i = 0; i < this.numPoints; i++) {
        if (range.contains(this.objects[i])) found.push(this.objects[i]);
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