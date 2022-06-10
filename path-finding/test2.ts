import PF from 'pathfinding';
import { createCanvas } from './canvas';
console.log(PF);
class Point {
  x: number;
  y: number;
  isVisited: boolean;
  cameFrom: Point;
  f: number;
  g: number;
  h: number;
  cost: number;
  constructor(x: number, y: number, isVisited: boolean = false) {
    this.x = x;
    this.y = y;
    this.isVisited = isVisited;
    this.init();
  }

  init() {
    this.isVisited = false;
    this.g = Number.MAX_VALUE;
    this.f = Number.MAX_VALUE;
    this.h = 0;
    this.cameFrom = undefined;
  }
}
class Rectangle {
  x;
  y;
  width;
  height;
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  containsPoint(point: Point) {
    if (
      point.x >= this.x &&
      point.x <= this.x + this.width &&
      point.y >= this.y &&
      point.y <= this.y + this.height
    ) {
      return true;
    }
    return false;
  }
}

let width = 10000;
let height = 10000;
let finder = new PF.BiBestFirstFinder({
  //   diagonalMovement: PF.DiagonalMovement.Never,
});
let canvas = createCanvas(width, height);
let ctx = canvas.getContext('2d');
let rectangles: Rectangle[] = [];
function main() {
  rectangles.push(new Rectangle(30, 30, 150, 350));
  rectangles.push(new Rectangle(230, 30, 350, 350));
  rectangles.push(new Rectangle(20, 430, 880, 20));

  ctx.fillStyle = 'red';
  for (let rect of rectangles) {
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  }
  let grid = new PF.Grid(width, height);
  for (let rect of rectangles) {
    for (let x = rect.x; x < rect.x + rect.width; x++) {
      for (let y = rect.y; y < rect.y + rect.height; y++) {
        grid.setWalkableAt(x, y, false);
      }
    }
  }

  const source = new Point(1, 2);
  const target = new Point(9990, 9990);
  console.time('find');
  let path = finder.findPath(source.x, source.y, target.x, target.y, grid);
  console.timeEnd('find');
  ctx.fillStyle = 'blue';
  for (let p of path) {
    let [x, y] = p;
    ctx.fillRect(x, y, 1, 1);
  }
  canvas.addEventListener('mousemove', (e) => {
    let grid = new PF.Grid(width, height);
    for (let rect of rectangles) {
      for (let x = rect.x; x < rect.x + rect.width; x++) {
        for (let y = rect.y; y < rect.y + rect.height; y++) {
          grid.setWalkableAt(x, y, false);
        }
      }
    }
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'red';
    for (let rect of rectangles) {
      ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    }

    const source = new Point(1, 2);
    const target = new Point(e.offsetX, e.offsetY);
    console.time('find');
    let path = finder.findPath(source.x, source.y, target.x, target.y, grid);
    console.timeEnd('find');
    ctx.fillStyle = 'blue';
    for (let p of path) {
      let [x, y] = p;
      ctx.fillRect(x, y, 1, 1);
    }
  });
}
main();
