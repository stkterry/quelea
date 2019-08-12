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
    this.q1 = new QuadTree(
      new Rect(x + w, y - h, w, h ),
      this.cap
    );
    this.q4 = new QuadTree(
      new Rect(x + w, y + h, w, h),
      this.cap 
    );
    this.q3 = new QuadTree(
      new Rect(x - w, y + h, w, h),
      this.cap
    );
    this.q2 = new QuadTree(
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
      this.q1.insert(object) ||
      this.q4.insert(object) ||
      this.q3.insert(object) ||
      this.q2.insert(object)
    ) return true;
  }

  sever() {
    this.numPoints = 0;
    this.divided = false;
  }

  query(range, found = []) {
    if (!range.intersects(this.bounds)) return found
      for (let i = 0; i < this.numPoints; i++) {
        if (range.contains(this.objects[i])) found.push(this.objects[i]);
      }

      if (this.divided) {
        this.q1.query(range, found);
        this.q4.query(range, found);
        this.q3.query(range, found);
        this.q2.query(range, found);
      }
      return found; 
  }

}
export default QuadTree;