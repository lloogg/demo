// f(n) = g(n) + h(n)
// closedSet: nodes that alreay been evaluated
// openSet: nodes need to be evaluated
import { createCanvas } from './canvas';

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

type Direction =
  | 'left'
  | 'top'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';
function heuristic(a: Point, b: Point) {
  //   return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  // return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function getLowestFPointInOpenSet(openSet: Point[]) {
  return openSet.reduce((memo, current) => {
    return current.f < memo.f ? current : memo;
  });
}

function getDirection(current: Point, cameFrom: Point): Direction {
  if (current.x === cameFrom.x) {
    return current.y - cameFrom.y > 0 ? 'bottom' : 'top';
  }

  if (current.y === cameFrom.y) {
    return current.x - cameFrom.x > 0 ? 'right' : 'left';
  }
}

let width = 1000;
let height = 1000;
let canvas = createCanvas(width, height);
let ctx = canvas.getContext('2d');
let rectangles: Rectangle[] = [];
let interval;
function astar(source: Point, target: Point, width, height) {
  const pointMap = new Map<string, Point>();

  function getNeighbors(point: Point) {
    let x = point.x;
    let y = point.y;

    let neighbors: {
      [key in Direction]?: Point;
    } = {};
    // right
    if (x < width - 1) {
      let key = `${x + 1} ${y}`;
      let right = pointMap.get(key);
      if (right === undefined) {
        right = new Point(x + 1, y);
        pointMap.set(key, right);
      }
      neighbors.right = right;
    }
    // left
    if (x > 0) {
      let key = `${x - 1} ${y}`;
      let left = pointMap.get(key);
      if (left === undefined) {
        left = new Point(x - 1, y);
        pointMap.set(key, left);
      }
      neighbors.left = left;
    }
    // top
    if (y > 0) {
      let key = `${x} ${y - 1}`;
      let top = pointMap.get(key);
      if (top === undefined) {
        top = new Point(x, y - 1);
        pointMap.set(key, top);
      }
      neighbors.top = top;
    }
    // bottom
    if (y < height - 1) {
      let key = `${x} ${y + 1}`;
      let bottom = pointMap.get(key);
      if (bottom === undefined) {
        bottom = new Point(x, y + 1);
        pointMap.set(key, bottom);
      }
      neighbors.bottom = bottom;
    }

    for (let key in neighbors) {
      let neighbor = neighbors[key] as Point;
      for (let rectangle of rectangles) {
        if (rectangle.containsPoint(neighbor) || neighbor.isVisited) {
          delete neighbors[key];
        }
      }
    }
    return neighbors;
  }

  let openSet: Point[] = [];
  openSet.push(source);
  source.isVisited = true;
  // source.f = 0;
  source.g = 0;
  source.f = heuristic(source, target);
  // pointMap.set(`${source.x} ${source.y}`, source);

  // while (openSet.length !== 0) {
  let previousDirection;
  interval = setInterval(() => {
    if (openSet.length !== 0) {
      let current = getLowestFPointInOpenSet(openSet);

      if (current !== source && !previousDirection) {
        previousDirection = getDirection(current, current.cameFrom);
      }
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'red';
      for (let rect of rectangles) {
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
      }
      ctx.fillStyle = 'red';

      for (let point of openSet) {
        ctx.fillRect(point.x, point.y, 1, 1);
      }

      ctx.fillStyle = 'black';
      pointMap.forEach((value, key) => {
        let point = value;
        if (point.isVisited) {
          ctx.fillRect(point.x, point.y, 1, 1);
        }
      });
      ctx.fillStyle = 'blue';

      for (let i = current; i != source; i = i.cameFrom) {
        ctx.fillRect(i.x, i.y, 1, 1);
      }
      if (current.x === target.x && current.y === target.y) {
        // return current;
        clearInterval(interval);
      }

      // remove current in openSet
      let currentIndex = openSet.indexOf(current);
      openSet.splice(currentIndex, 1);
      current.isVisited = true;

      // let current = queue.shift();
      let neighbors = getNeighbors(current);
      for (let key in neighbors) {
        let neighbor: Point = neighbors[key];
        let tempG = current.g + 1;
        if (getDirection(neighbor, current) === previousDirection) {
          tempG = current.g;
        }
        if (tempG < neighbor.g || !openSet.includes(neighbor)) {
          neighbor.cameFrom = current;
          neighbor.g = tempG;
          neighbor.h = heuristic(neighbor, target);
          neighbor.f = neighbor.g + 100 * neighbor.h;
          openSet.push(neighbor);
        }
      }
    } else {
      clearInterval(interval);
    }
  }, 1);
  // }
}

function main() {
  rectangles.push(new Rectangle(30, 30, 150, 350));
  rectangles.push(new Rectangle(230, 30, 350, 350));
  rectangles.push(new Rectangle(20, 430, 880, 20));

  ctx.fillStyle = 'red';
  for (let rect of rectangles) {
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  }

  canvas.addEventListener('mousemove', (e) => {
    clearInterval(interval);

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'red';
    for (let rect of rectangles) {
      ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    }

    const source = new Point(1, 2);
    const target = new Point(e.offsetX, e.offsetY);

    astar(source, target, width, height);
  });
}
main();
