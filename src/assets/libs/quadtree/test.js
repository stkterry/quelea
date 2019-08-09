// const QuadTree = require("./quadtree");
// const Point = require("./quad_point");
// const QRect = require("./quad_rect");

// const { Rand } = require("../util");

import QuadTree from "./quadtree";
import Point from "./quad_point";
import QRect from "./quad_rect";
import { Rand } from "../util";


const width = 400;
const height = 400;
let bounds = new QRect(100, 100, 100, 100);
let qt = new QuadTree(bounds);

for (let i = 0; i < 1; i++) {
  qt.push(new Point(Rand(width), Rand(height)));
}
console.log(qt);