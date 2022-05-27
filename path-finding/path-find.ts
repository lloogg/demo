import { createCanvas } from './canvas';

type Point = {
  x: number;
  y: number;
  isVisited: boolean;
};
type Direction = 'left' | 'top' | 'right' | 'bottom';
const pageSize = 100;
function pathFind(source: Point, target: Point, points: Point[][]) {
  let width = points[0].length;
  let height = points.length;
  let toMap = new Map<Point, Point>();

  function getNeighbors(point: Point) {
    let x = point.x;
    let y = point.y;
    //   let neighbors: {
    //     [key in Direction]:Point
    // }= {left:null, top: null,right: null, bottom:null};
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
        // neighbors.push(left);
        neighbors.left = left;
      }
    }
    // top
    if (y > 0) {
      let top = points[y - 1][x];
      if (!top.isVisited) {
        // neighbors.push(top);
        neighbors.top = top;
      }
    }
    // bottom
    if (y < height - 1) {
      let bottom = points[y + 1][x];
      if (!bottom.isVisited) {
        // neighbors.push(bottom);
        neighbors.bottom = bottom;
      }
    }

    return neighbors;
  }

  let queue: Point[] = [];
  queue.push(source);
  source.isVisited = true;
  let nextIndex: Direction;
  if (target.x < source.x) {
    nextIndex = 'left';
  } else if (target.y < source.y) {
    nextIndex = 'top';
  } else if (target.x > source.x) {
    nextIndex = 'right';
  } else if (target.y > source.y) {
    nextIndex = 'bottom';
  }

  while (queue.length !== 0) {
    let current = queue.shift();
    let neighbors = getNeighbors(current);

    for (let key in neighbors) {
      queue.push(current);

      let next: Point = neighbors[key];
      next.isVisited = true;
      toMap.set(next, current);
      if (next === target) {
        return toMap;
      }
      queue.push(next);
    }
  }
}

function testPath() {
  let width = 1000;
  let height = 1000;

  let points: Point[][] = [];
  let canvas = createCanvas(width, height);
  let ctx = canvas.getContext('2d');
  for (let i = 0; i < height; i++) {
    let row = [];
    for (let j = 0; j < width; j++) {
      if (i > 130 && i < 250 && (j < 30 || j > 50)) {
        ctx.fillStyle = 'red';
        ctx.fillRect(j, i, 1, 1);
        row.push({ x: j, y: i, isVisited: true });
      } else if (i > 5 && i < 15 && j > 4 && j < 250) {
        ctx.fillStyle = 'red';
        ctx.fillRect(j, i, 1, 1);
        row.push({ x: j, y: i, isVisited: true });
      } else {
        row.push({ x: j, y: i, isVisited: false });
      }
    }
    points.push(row);
  }
  let source = points[0][0];
  let target = points[250][200];

  canvas.addEventListener('mousemove', (e) => {
    console.time('clear');
    ctx.clearRect(0, 0, width, height);
    console.timeEnd('clear');

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        points[i][j].isVisited = false;
      }
    }
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (i > 130 && i < 250 && (j < 30 || j > 50)) {
          ctx.fillStyle = 'red';
          ctx.fillRect(j, i, 1, 1);
          points[i][j].isVisited = true;
        } else if (i > 5 && i < 15 && j > 4 && j < 25) {
          ctx.fillStyle = 'red';
          ctx.fillRect(j, i, 1, 1);
          points[i][j].isVisited = true;
        } else {
          points[i][j].isVisited = false;
        }
      }
    }
    target = points[e.offsetY][e.offsetX];
    if (target.isVisited) {
      return;
    }
    console.time('a');
    let toMap = pathFind(source, target, points);
    console.timeEnd('a');
    let paths = [];
    for (let i = target; i != source; i = toMap.get(i)) {
      paths.push(i);
    }
    console.time('draw');
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (paths.includes(points[i][j])) {
          ctx.fillStyle = 'blue';
          ctx.fillRect(points[i][j].x, points[i][j].y, 1, 1);
        }
      }
    }
    console.timeEnd('draw');
  });
  console.time('a');
  let toMap = pathFind(source, target, points);
  console.timeEnd('a');
  let paths = [];
  for (let i = target; i != source; i = toMap.get(i)) {
    paths.push(i);
  }

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (paths.includes(points[i][j])) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(points[i][j].x, points[i][j].y, 1, 1);
      }
    }
  }
}

testPath();
