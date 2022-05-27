// f(n) = g(n) + h(n)
// closedSet: nodes that alreay been evaluated
// openSet: nodes need to be evaluated
import { createCanvas } from './canvas';

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
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.cameFrom = undefined;
  }
}
type Direction = 'left' | 'top' | 'right' | 'bottom';
function heuristic(a: Point, b: Point) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}
function getLowestFPointInOpenSet(openSet: Point[]) {
  return openSet.reduce((memo, current) => {
    return current.f < memo.f ? current : memo;
  });
}
function draw(points: Point[][]) {
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points[0].length; j++) {}
  }
}
function pathFind(source: Point, target: Point, points: Point[][]) {
  let width = points[0].length;
  let height = points.length;
  let toMap = new Map<Point, Point>();

  function getNeighbors(point: Point) {
    let x = point.x;
    let y = point.y;

    let neighbors: {
      [key in Direction]?: Point;
    } = {};
    // right
    if (x < width - 1) {
      let right = points[y][x + 1];
      if (!right.isVisited) {
        neighbors.right = right;
      }
    }
    // left
    if (x > 0) {
      let left = points[y][x - 1];
      if (!left.isVisited) {
        neighbors.left = left;
      }
    }
    // top
    if (y > 0) {
      let top = points[y - 1][x];
      if (!top.isVisited) {
        neighbors.top = top;
      }
    }
    // bottom
    if (y < height - 1) {
      let bottom = points[y + 1][x];
      if (!bottom.isVisited) {
        neighbors.bottom = bottom;
      }
    }

    return neighbors;
  }

  let openSet = [];
  let closedSet = [];
  openSet.push(source);
  source.isVisited = true;

  while (openSet.length !== 0) {
    let current = getLowestFPointInOpenSet(openSet);
    if (current === target) {
      return;
    }

    // remove current in openSet
    let currentIndex = openSet.indexOf(current);
    openSet.splice(currentIndex, 1);
    current.isVisited = true;

    // let current = queue.shift();
    let neighbors = getNeighbors(current);
    for (let key in neighbors) {
      let next: Point = neighbors[key];
      if (!next.isVisited) {
        let tempG = current.g + 1;
        // if (openSet.includes(next)) {
        //   if (tempG < next.g) {
        //     next.g = tempG;
        //   }
        // } else {
        //   next.g = tempG;
        //   openSet.push(next);
        // }
        if (tempG < next.g || !openSet.includes(next)) {
          next.cameFrom = current;
          next.g = tempG;
          next.h = heuristic(next, target);
          next.f = next.g + next.h;
          if (!openSet.includes(next)) {
            openSet.push(next);
          }
        }
      }
    }
  }
}

function main() {
  let width = 1000;
  let height = 1000;

  let points: Point[][] = [];
  let canvas = createCanvas(width, height);
  let ctx = canvas.getContext('2d');
  console.time('a');

  for (let i = 0; i < height; i++) {
    let row = [];
    for (let j = 0; j < width; j++) {
      if (i > 130 && i < 250 && (j < 30 || j > 50)) {
        ctx.fillStyle = 'red';
        ctx.fillRect(j, i, 1, 1);
        // row.push({ x: j, y: i, isVisited: true });
        row.push(new Point(j, i, true));
      } else if (i > 5 && i < 15 && j > 4 && j < 250) {
        ctx.fillStyle = 'red';
        ctx.fillRect(j, i, 1, 1);
        // row.push({ x: j, y: i, isVisited: true });
        row.push(new Point(j, i, true));
      } else {
        // row.push({ x: j, y: i, isVisited: false });
        row.push(new Point(j, i));
      }
    }
    points.push(row);
  }
  let source = points[0][0];
  let target = points[250][200];

  canvas.addEventListener('mousemove', (e) => {
    console.time('calculate');
    ctx.clearRect(0, 0, width, height);

    points = [];

    for (let i = 0; i < height; i++) {
      let row = [];
      for (let j = 0; j < width; j++) {
        if (i > 130 && i < 250 && (j < 30 || j > 50)) {
          ctx.fillStyle = 'red';
          ctx.fillRect(j, i, 1, 1);
          row.push(new Point(j, i, true));
        } else if (i > 5 && i < 15 && j > 4 && j < 250) {
          ctx.fillStyle = 'red';
          ctx.fillRect(j, i, 1, 1);
          row.push(new Point(j, i, true));
        } else {
          row.push(new Point(j, i));
        }
      }
      points.push(row);
    }

    target = points[e.offsetY][e.offsetX];
    if (target.isVisited) {
      return;
    }

    pathFind(source, target, points);

    let paths = [];
    for (let i = target; i != source; i = i.cameFrom) {
      ctx.fillStyle = 'blue';
      ctx.fillRect(i.x, i.y, 1, 1);
    }
    console.timeEnd('calculate');
  });

  pathFind(source, target, points);
  console.timeEnd('a');
  let paths = [];
  for (let i = target; i != source; i = i.cameFrom) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(i.x, i.y, 1, 1);
  }

  // for (let i = 0; i < height; i++) {
  //   for (let j = 0; j < width; j++) {
  //     if (paths.includes(points[i][j])) {
  //
  //       ctx.fillRect(points[i][j].x, points[i][j].y, 1, 1);
  //     }
  //   }
  // }
}

main();
