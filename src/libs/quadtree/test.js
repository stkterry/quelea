import QuadTree from "./quadtree";
import QRect from './quad_rect';


let field = new QRect(500, 500, 500, 500);

let qtree = new QuadTree(field, 4);


console.log(qtree)