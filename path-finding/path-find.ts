type Point = {
  x: number;
  y: number;
  isVisited: boolean;
};
type Direction = 'left' | 'top' | 'right' | 'bottom';
function pathFind(source: Point, target: Point, points: Point[][]) {
  let width = points[0].length;
  let height = points.length;
  let toMap = new Map<Point, Point>();
  function ll() {
    console.clear();
    let s = '';
    for (let i = 0; i < height; i++) {
      let r = '';
      for (let j = 0; j < width; j++) {
        r = r + (points[i][j].isVisited ? '1' : '0') + ', ';
      }
      s = s + r + '\n';
    }
    console.log(s);
  }
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
  //   let stack: Point[] = [];
  //   stack.push(source);
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
  let interval = setInterval(() => {
    // console.log(stack.length);
    if (queue.length !== 0) {
      let current = queue.shift();
      let neighbors = getNeighbors(current);

      for (let key in neighbors) {
        queue.push(current);

        //   let nextIndex = Math.floor(Math.random() * neighbors.length);
        // if (!neighbors.left && ) {
        //   nextIndex = 'left';
        // } else if (neighbors.top && target.y < current.y) {
        //   nextIndex = 'top';
        // } else if (neighbors.right && target.x > current.x) {
        //   nextIndex = 'right';
        // } else if (neighbors.bottom && target.y >current.y) {
        //   nextIndex = 'bottom';
        // }
        // if (nextIndex) {
        let next: Point = neighbors[key];
        next.isVisited = true;
        toMap.set(next, current);
        if (next === target) {
          let s = '';

          let paths = [];
          for (let i = target; i != source; i = toMap.get(i)) {
            paths.push(i);
          }

          for (let i = 0; i < height; i++) {
            let r = '';
            for (let j = 0; j < width; j++) {
              r =
                r +
                (paths.includes(points[i][j])
                  ? '-'
                  : points[i][j].isVisited
                  ? 'p'
                  : '0') +
                ', ';
            }
            s = s + r + '\n';
          }
          console.log(s);

          clearInterval(interval);
        } else {
          ll();
        }
        queue.push(next);
        // }
      }
    }
  }, 1);
}

function testPath() {
  let width = 30;
  let height = 30;
  let points: Point[][] = [];
  for (let i = 0; i < height; i++) {
    let row = [];
    for (let j = 0; j < width; j++) {
      if (i > 3 && i < 16 && j >= 2 && j <= 19) {
        row.push({ x: j, y: i, isVisited: true });
      } else {
        row.push({ x: j, y: i, isVisited: false });
      }
    }
    points.push(row);
  }
  console.log(points);
  pathFind(points[0][0], points[12][12], points);
}

testPath();
