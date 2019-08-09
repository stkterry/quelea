// const QuadTree = require("./quadtree");
// const Point = require("./quad_point");
// const QRect = require("./quad_rect");

import QuadTree from "./quadtree";
import Point from "./quad_point";
import QRect from "./quad_rect";
import { Rand } from "../util";


const width = 400;
const height = 400;
let bounds = new QRect(200, 200, 200, 200);
let qt = new QuadTree(bounds, 4);

for (let i = 0; i < 100; i++) {
  qt.insert(new Point(Rand(0, width), Rand(0, height)));
}

// console.log(qt);

// console.log(range);
// let range = new QRect(50, 50, 100, 100);
let all = qt.query(new QRect(50, 50, 100, 100))

console.log(qt);
