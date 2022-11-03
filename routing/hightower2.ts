import { createSvg } from './util';
import { Point } from '../graph/point';

let xmlns = 'http://www.w3.org/2000/svg';
type Dir = 'top' | 'right' | 'bottom' | 'left';

class Line {
  dir: Dir;
  start: Point;
  end: Point;
  constructor(start: Point, end: Point) {
    this.start = start;
    this.end = end;
  }
  intersectsWithLine(line: Line) {
    const pt1Dir = new Point(
      this.end.x - this.start.x,
      this.end.y - this.start.y,
    );
    const pt2Dir = new Point(
      line.end.x - line.start.x,
      line.end.y - line.start.y,
    );
    const det = pt1Dir.x * pt2Dir.y - pt1Dir.y * pt2Dir.x;
    const deltaPt = new Point(
      line.start.x - this.start.x,
      line.start.y - this.start.y,
    );
    const alpha = deltaPt.x * pt2Dir.y - deltaPt.y * pt2Dir.x;
    const beta = deltaPt.x * pt1Dir.y - deltaPt.y * pt1Dir.x;

    if (det === 0 || alpha * det < 0 || beta * det < 0) {
      return null;
    }

    if (det > 0) {
      if (alpha > det || beta > det) {
        return null;
      }
    } else if (alpha < det || beta < det) {
      return null;
    }

    return new Point(
      this.start.x + (alpha * pt1Dir.x) / det,
      this.start.y + (alpha * pt1Dir.y) / det,
    );
  }
}
class Rectangle {
  x;
  y;
  width;
  height;
  get left() {
    return this.x;
  }

  get top() {
    return this.y;
  }

  get right() {
    return this.x + this.width;
  }

  get bottom() {
    return this.y + this.height;
  }

  get origin() {
    return new Point(this.x, this.y);
  }

  get topLeft() {
    return new Point(this.x, this.y);
  }

  get topCenter() {
    return new Point(this.x + this.width / 2, this.y);
  }

  get topRight() {
    return new Point(this.x + this.width, this.y);
  }

  get center() {
    return new Point(this.x + this.width / 2, this.y + this.height / 2);
  }

  get bottomLeft() {
    return new Point(this.x, this.y + this.height);
  }

  get bottomCenter() {
    return new Point(this.x + this.width / 2, this.y + this.height);
  }

  get bottomRight() {
    return new Point(this.x + this.width, this.y + this.height);
  }

  get corner() {
    return new Point(this.x + this.width, this.y + this.height);
  }

  get rightMiddle() {
    return new Point(this.x + this.width, this.y + this.height / 2);
  }

  get leftMiddle() {
    return new Point(this.x, this.y + this.height / 2);
  }

  get topLine() {
    return new Line(this.topLeft, this.topRight);
  }

  get rightLine() {
    return new Line(this.topRight, this.bottomRight);
  }

  get bottomLine() {
    return new Line(this.bottomLeft, this.bottomRight);
  }

  get leftLine() {
    return new Line(this.topLeft, this.bottomLeft);
  }

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

  intersectsWithLine(line: Line) {
    const rectLines = [
      this.topLine,
      this.bottomLine,
      this.leftLine,
      this.rightLine,
    ];
    const points: Point[] = [];
    const dedupeArr: string[] = [];
    rectLines.forEach((l) => {
      const p = line.intersectsWithLine(l);

      if (p !== null && dedupeArr.indexOf(p.toString()) < 0) {
        points.push(p);
        dedupeArr.push(p.toString());
      }
    });

    return points.length > 0 ? points : null;
  }

  moveAndExpand(ratio: number) {
    return new Rectangle(
      this.x - ratio,
      this.y - ratio,
      this.width + 2 * ratio,
      this.height + 2 * ratio,
    );
  }
}
let width = 1000;
let height = 1000;
let svg = createSvg(width, height);
let rectangles: Rectangle[] = [];

type FourDirection = {
  [key in Dir]?: Rectangle;
};

function genNeighbors(pointStringSet: Set<string>): Map<string, Neighbor> {
  let result = new Map<string, Neighbor>();
  for (let pointString of pointStringSet) {
    let point = JSON.parse(pointString) as Point;
    result.set(pointString, {});
    for (let otherPointString of pointStringSet) {
      let otherPoint = JSON.parse(otherPointString) as Point;
      if (otherPointString === pointString) {
        continue;
      }

      function checkIntersect() {
        const line = new Line(point, otherPoint);
        const rects = rectangles.slice();
        for (let rect of rects) {
          rect = rect.moveAndExpand(-5);
          if (rect.intersectsWithLine(line)) {
            return true;
          }
        }
      }

      if (otherPoint.x === point.x) {
        if (checkIntersect()) continue;
        // * top
        if (otherPoint.y < point.y) {
          if (result.get(pointString).top == null) {
            result.get(pointString).top = otherPointString;
          } else {
            let oldString = result.get(pointString).top;
            let oldPoint = JSON.parse(oldString) as Point;
            if (otherPoint.y > oldPoint.y) {
              result.get(pointString).top = otherPointString;
            }
          }
        }
        // * bottom
        if (otherPoint.y > point.y) {
          if (result.get(pointString).bottom == null) {
            result.get(pointString).bottom = otherPointString;
          } else {
            let oldString = result.get(pointString).bottom;
            let oldPoint = JSON.parse(oldString) as Point;
            if (otherPoint.y < oldPoint.y) {
              result.get(pointString).bottom = otherPointString;
            }
          }
        }
      } else if (otherPoint.y === point.y) {
        if (checkIntersect()) continue;
        // * right
        if (otherPoint.x > point.x) {
          if (result.get(pointString).right == null) {
            result.get(pointString).right = otherPointString;
          } else {
            let oldString = result.get(pointString).right;
            let oldPoint = JSON.parse(oldString) as Point;
            if (otherPoint.x < oldPoint.x) {
              result.get(pointString).right = otherPointString;
            }
          }
        }
        // * left
        if (otherPoint.x < point.x) {
          if (result.get(pointString).left == null) {
            result.get(pointString).left = otherPointString;
          } else {
            let oldString = result.get(pointString).left;
            let oldPoint = JSON.parse(oldString) as Point;
            if (otherPoint.x > oldPoint.x) {
              result.get(pointString).left = otherPointString;
            }
          }
        }
      }
    }
  }
  return result;
}
type Neighbor = {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
};
// rectangles.push(new Rectangle(30, 30, 150, 350));
// rectangles.push(new Rectangle(230, 30, 150, 200));
// rectangles.push(new Rectangle(200, 30, 10, 300));
// rectangles.push(new Rectangle(20, 430, 880, 20));
// rectangles.push(new Rectangle(20, 450, 20, 200));
// rectangles.push(new Rectangle(880, 450, 20, 200));
// rectangles.push(new Rectangle(40, 650, 400, 20));
// rectangles.push(new Rectangle(430, 480, 20, 180));
// rectangles.push(new Rectangle(40, 550, 200, 20));
// rectangles.push(new Rectangle(60, 450, 20, 200));

for (let i = 0; i < 200; i++) {
  rectangles.push(
    new Rectangle(
      Math.floor(Math.random() * 700),
      Math.floor(Math.random() * 700),
      Math.floor(Math.random() * 10 + 20),
      Math.floor(Math.random() * 10 + 20),
    ),
  );
}

for (let rect of rectangles) {
  let rectangle = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'rect',
  );
  rectangle.setAttribute('fill', 'red');
  rectangle.setAttribute('x', `${rect.x}`);
  rectangle.setAttribute('y', `${rect.y}`);
  rectangle.setAttribute('width', `${rect.width}`);
  rectangle.setAttribute('height', `${rect.height}`);
  svg.appendChild(rectangle);
}
rectangles = rectangles.map((item) => {
  return item.moveAndExpand(5);
});

// svg.addEventListener('click', (e) => {
//   // source = new Point(e.offsetX, e.offsetY);
//   let pointSet = new Set<string>();
//   let lineMap = new Map();
//   // let neighborMap = new Map<string, Neighbor>();
//   const source = new Point(
//     Math.floor(Math.random() * 1000),
//     Math.floor(Math.random() * 1000),
//   );
//   const target = new Point(e.offsetX, e.offsetY);
//   // const source = new Point(340, 224);
//   // const target = new Point(582, 615);

//   let slines: Set<string> = new Set();
//   let tlines: Set<string> = new Set();
//   let smap = new Map<string, FourDirection>();
//   let tmap = new Map<string, FourDirection>();
//   smap.set(source.toString(), null);
//   tmap.set(target.toString(), null);
//   let ok = false;
//   let loop = 4;
//   const temp = loop;
//   while (!ok && loop > 0) {
//     loop -= 1;
//     getLines(tmap, tlines, pointSet, lineMap, 'left');
//     getLines(smap, slines, pointSet, lineMap, 'right');
//     for (let slineString of slines) {
//       let [sStartX, sStartY, sEndX, sEndY] = slineString
//         .split(' ')
//         .map((item) => {
//           return parseInt(item);
//         });
//       let sline = new Line(
//         null,
//         new Point(sStartX, sStartY),
//         new Point(sEndX, sEndY),
//       );
//       for (let tlineString of tlines) {
//         let [tStartX, tStartY, tEndX, tEndY] = tlineString
//           .split(' ')
//           .map((item) => {
//             return parseInt(item);
//           });
//         let tline = new Line(
//           null,
//           new Point(tStartX, tStartY),
//           new Point(tEndX, tEndY),
//         );
//         if (sline.intersectsWithLine(tline)) {
//           let intersectPoint = sline.intersectsWithLine(tline);

//           // {
//           //   let rectangle = document.createElementNS(
//           //     'http://www.w3.org/2000/svg',
//           //     'rect',
//           //   );
//           //   rectangle.setAttribute('fill', 'black');
//           //   rectangle.setAttribute('x', `${intersectPoint.x - 2}`);
//           //   rectangle.setAttribute('y', `${intersectPoint.y - 2}`);
//           //   rectangle.setAttribute('width', `${4}`);
//           //   rectangle.setAttribute('height', `${4}`);
//           //   svg.appendChild(rectangle);
//           // }
//           // neighborMap.set(intersectPoint.toString(), {});
//           // let p1 = lineMap.get(slineString);
//           // let p2 = lineMap.get(tlineString);
//           pointSet.add(intersectPoint.toString());

//           let neighborMap = genNeighbors(pointSet);
//           // for (let key of Array.from(neighborMap.keys())) {
//           //   let rect = JSON.parse(key) as Point;
//           //   let rectangle = document.createElementNS(
//           //     'http://www.w3.org/2000/svg',
//           //     'rect',
//           //   );
//           //   rectangle.setAttribute('fill', 'lightblue');
//           //   rectangle.setAttribute('x', `${rect.x - 3}`);
//           //   rectangle.setAttribute('y', `${rect.y - 3}`);
//           //   rectangle.setAttribute('width', `${6}`);
//           //   rectangle.setAttribute('height', `${6}`);
//           //   svg.appendChild(rectangle);
//           // }
//           let d = aStar(neighborMap, source.toString(), target.toString());
//           sPath.setAttribute('d', d);
//           return;
//         }
//       }
//     }
//   }
//   if (!ok) {
//     let d = `M ${source.x} ${source.y} L ${source.x} ${target.y} L ${target.x} ${target.y}`;
//     sPath.setAttribute('d', d);
//   }
// });

let paths:SVGPathElement[] = []

let sPath = document.createElementNS(xmlns, 'path');

sPath.setAttribute('stroke', 'blue');
sPath.setAttribute('stroke-width', '3');
sPath.setAttribute('fill', 'none');
svg.appendChild(sPath);

let source: Point;
let target: Point;

svg.addEventListener('click', (e) => {
  let pointSet = new Set<string>();
  let lineMap = new Map();
  let debugRects: SVGRectElement[] = [];
  if (source == null) {
    source = new Point(e.offsetX, e.offsetY);
    return;
  }
  if (target == null) {
    target = new Point(e.offsetX, e.offsetY);
    return;
  }

  let slines: Set<string> = new Set();
  let tlines: Set<string> = new Set();
  let smap = new Map<string, FourDirection>();
  let tmap = new Map<string, FourDirection>();
  smap.set(source.toString(), null);
  tmap.set(target.toString(), null);
  let ok = false;
  let loop = 50;
  while (!ok && loop > 0) {
    for (let rect of debugRects) {
      rect.remove();
    }

    debugRects = [];

    {
      let sourceRect = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'rect',
      );
      sourceRect.setAttribute('fill', 'orange');
      sourceRect.setAttribute('x', `${source.x - 3}`);
      sourceRect.setAttribute('y', `${source.y - 3}`);
      sourceRect.setAttribute('width', `${6}`);
      sourceRect.setAttribute('height', `${6}`);
      svg.appendChild(sourceRect);

      let targetRect = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'rect',
      );
      targetRect.setAttribute('fill', 'purple');
      targetRect.setAttribute('x', `${target.x - 3}`);
      targetRect.setAttribute('y', `${target.y - 3}`);
      targetRect.setAttribute('width', `${6}`);
      targetRect.setAttribute('height', `${6}`);
      svg.appendChild(targetRect);

      debugRects.push(sourceRect, targetRect);
    }
    loop -= 1;
    getLines(tmap, tlines, pointSet, lineMap, 'left');
    getLines(smap, slines, pointSet, lineMap, 'right');

    for (let slineString of slines) {
      let [slineStartX, slineStartY, slineEndX, slineEndY] = slineString
        .split(' ')
        .map((item) => {
          return parseInt(item);
        });
      let sline = new Line(
        new Point(slineStartX, slineStartY),
        new Point(slineEndX, slineEndY),
      );
      for (let tlineString of tlines) {
        let [tlineStartX, tlineStartY, tlineEndX, tlineEndY] = tlineString
          .split(' ')
          .map((item) => {
            return parseInt(item);
          });
        let tline = new Line(
          new Point(tlineStartX, tlineStartY),
          new Point(tlineEndX, tlineEndY),
        );
        if (sline.intersectsWithLine(tline)) {
          ok = true;
          let intersectPoint = sline.intersectsWithLine(tline);
          pointSet.add(intersectPoint.toString());
        }
      }
    }
  }

  for (let key of pointSet) {
    let rect = JSON.parse(key) as Point;
    let rectangle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'rect',
    );
    rectangle.setAttribute('fill', 'lightblue');
    rectangle.setAttribute('x', `${rect.x - 3}`);
    rectangle.setAttribute('y', `${rect.y - 3}`);
    rectangle.setAttribute('width', `${6}`);
    rectangle.setAttribute('height', `${6}`);
    svg.appendChild(rectangle);
    debugRects.push(rectangle);
  }

  if (!ok) {
    let d = `M ${source.x} ${source.y} L ${source.x} ${target.y} L ${target.x} ${target.y}`;
    sPath.setAttribute('d', d);
    console.log('fuck');
  } else {
    let neighborMap = genNeighbors(pointSet);
    let d = aStar(neighborMap, source.toString(), target.toString());
    sPath.setAttribute('d', d);

    for (let path of paths) {
      path.remove()
    }
    paths = []
  }
});

function getLines(
  map: Map<string, FourDirection>,
  lines: Set<string>,
  pointSet: Set<string>,
  lineMap: Map<string, string>,
  preferDirection?,
) {
  let newLines = new Set<string>();
  let tempMap = new Map<string, FourDirection>(map);
  map.clear();
  for (let pointJson of Array.from(tempMap.keys())) {
    pointSet.add(pointJson);
    let point = JSON.parse(pointJson) as Point;
    if (tempMap.get(pointJson) == null) {
      tempMap.set(pointJson, {});
    }
    for (let rectangle of rectangles) {
      // top
      if (
        rectangle.x < point.x &&
        rectangle.x + rectangle.width > point.x &&
        point.y > rectangle.y + rectangle.height
      ) {
        if (!tempMap.get(pointJson).top) {
          tempMap.get(pointJson).top = rectangle;
        } else if (
          tempMap.get(pointJson).top.y + tempMap.get(pointJson).top.height <
          rectangle.y + rectangle.height
        ) {
          tempMap.get(pointJson).top = rectangle;
        }
      }
      // left
      if (
        rectangle.y < point.y &&
        rectangle.y + rectangle.height > point.y &&
        rectangle.x + rectangle.width < point.x
      ) {
        if (!tempMap.get(pointJson).left) {
          tempMap.get(pointJson).left = rectangle;
        } else if (
          tempMap.get(pointJson).left.x + tempMap.get(pointJson).left.width <
          rectangle.x + rectangle.width
        ) {
          tempMap.get(pointJson).left = rectangle;
        }
      }
      // bottom
      if (
        rectangle.x < point.x &&
        rectangle.x + rectangle.width > point.x &&
        point.y < rectangle.y
      ) {
        if (!tempMap.get(pointJson).bottom) {
          tempMap.get(pointJson).bottom = rectangle;
        } else if (tempMap.get(pointJson).bottom.y > rectangle.y) {
          tempMap.get(pointJson).bottom = rectangle;
        }
      }
      // right
      if (
        rectangle.y < point.y &&
        rectangle.y + rectangle.height > point.y &&
        rectangle.x > point.x
      ) {
        if (!tempMap.get(pointJson).right) {
          tempMap.get(pointJson).right = rectangle;
        } else if (tempMap.get(pointJson).right.x > rectangle.x) {
          tempMap.get(pointJson).right = rectangle;
        }
      }
    }

    let { left, right, top, bottom } = tempMap.get(pointJson);

    // right
    if (right) {
      if (right.x - 1 !== point.x) {
        const escapePoint = new Point(right.x - 1, point.y);

        if (!map.has(escapePoint.toString())) {
          map.set(escapePoint.toString(), null);
        }
      }
    }

    // left
    if (left) {
      if (left.x + left.width + 1 !== point.x) {
        const escapePoint = new Point(left.x + left.width + 1, point.y);

        if (!map.has(escapePoint.toString())) {
          map.set(escapePoint.toString(), null);
        }
      }
    }

    // top
    if (top) {
      if (top.y + top.height + 1 !== point.y) {
        const escapePoint = new Point(point.x, top.y + top.height + 1);

        if (!map.has(escapePoint.toString())) {
          map.set(escapePoint.toString(), null);
        }
      }
    }

    // bottom
    if (bottom) {
      if (bottom.y - 1 !== point.y) {
        const escapePoint = new Point(point.x, bottom.y - 1);

        if (!map.has(escapePoint.toString())) {
          map.set(escapePoint.toString(), null);
        }
      }
    }

    // 横
    let hStart;
    let hEnd;
    hStart = left ? `${left.x + left.width + 1} ${point.y}` : `${1} ${point.y}`;
    hEnd = right ? `${right.x - 1} ${point.y}` : `${width - 1} ${point.y}`;
    if (!lines.has(hStart + ' ' + hEnd)) {
      newLines.add(hStart + ' ' + hEnd);
      lineMap.set(hStart + ' ' + hEnd, pointJson);
    }
    // 纵
    let vStart;
    let vEnd;
    vStart = top ? `${point.x} ${top.y + top.height + 1}` : `${point.x} ${1}`;
    vEnd = bottom ? `${point.x} ${bottom.y - 1}` : `${point.x} ${height - 1}`;
    if (!lines.has(vStart + ' ' + vEnd)) {
      newLines.add(vStart + ' ' + vEnd);
      lineMap.set(vStart + ' ' + vEnd, pointJson);
    }

    if (left && left.x + left.width + 1 === point.x) {
      if (!top || top.y + top.height < left.y - 1) {
        const escapePoint = new Point(point.x, left.y - 1);
        if (!map.has(escapePoint.toString())) {
          map.set(escapePoint.toString(), null);
        }
      }
      if (!bottom || bottom.y > left.y + left.height + 1) {
        const escapePoint = new Point(point.x, left.y + left.height + 1);
        if (!map.has(escapePoint.toString())) {
          map.set(escapePoint.toString(), null);
        }
      }
    }
    //
    if (right && right.x - 1 === point.x) {
      if (!top || top.y + top.height < right.y - 1) {
        const escapePoint = new Point(point.x, right.y - 1);
        if (!map.has(escapePoint.toString())) {
          map.set(escapePoint.toString(), null);
        }
      }
      if (!bottom || bottom.y > right.y + right.height + 1) {
        const escapePoint = new Point(point.x, right.y + right.height + 1);
        if (!map.has(escapePoint.toString())) {
          map.set(escapePoint.toString(), null);
        }
      }
    }
    //
    if (bottom && bottom.y - 1 === point.y) {
      if (!right || right.x > bottom.x + bottom.width + 1) {
        const escapePoint = new Point(bottom.x + bottom.width + 1, point.y);
        if (!map.has(escapePoint.toString())) {
          map.set(escapePoint.toString(), null);
        }
      }
      if (!left || left.x + left.width + 1 < bottom.x) {
        const escapePoint = new Point(bottom.x - 1, point.y);
        if (!map.has(escapePoint.toString())) {
          map.set(escapePoint.toString(), null);
        }
      }
    }
    //
    if (top && top.y + top.height + 1 === point.y) {
      if (!right || right.x > top.x + top.width + 1) {
        const escapePoint = new Point(top.x + top.width + 1, point.y);
        if (!map.has(escapePoint.toString())) {
          map.set(escapePoint.toString(), null);
        }
      }
      if (!left || left.x + left.width + 1 < top.x) {
        const escapePoint = new Point(top.x - 1, point.y);
        if (!map.has(escapePoint.toString())) {
          map.set(escapePoint.toString(), null);
        }
      }
    }

    for (let lineString of newLines) {
      let [startX, startY, endX, endY] = lineString.split(' ');
      let sPath = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path',
      );

      sPath.setAttribute('d', `M ${startX} ${startY} L ${endX} ${endY}`);
      sPath.setAttribute('stroke', 'black');
      sPath.setAttribute('stroke-width', '1');

      svg.appendChild(sPath);
      paths.push(sPath)

    }
  }
  newLines.forEach((item) => {
    lines.add(item);
  });
}

function aStar(
  neighborMap: Map<string, Neighbor>,
  source: string,
  target: string,
) {
  let cameFromMap = new Map();

  function getLowestFPointInOpenSet(): string {
    let result: string;
    for (let point of openSet) {
      if (result == null) {
        result = point;
      } else if (fScore[point] < fScore[result]) {
        result = point;
      }
    }
    return result;
  }

  function heuristic(a: string, b: string) {
    let aPoint = JSON.parse(a) as Point;
    let bPoint = JSON.parse(b) as Point;
    // return Math.abs(aPoint.x - bPoint.x) + Math.abs(aPoint.y - bPoint.y);
    return Math.hypot(aPoint.x - bPoint.x, aPoint.y - bPoint.y);
  }
  // let hMap = getHCost(neighborMap, source, target);
  let openSet: string[] = [];
  // let closedSet = new Set<string>();
  // openSet[source] = { g: 0, f: heuristic(source, target) };
  openSet.push(source);
  const gScore: { [key: string]: number } = { [source]: 0 };
  const fScore: { [key: string]: number } = {
    [source]: heuristic(source, target),
  };

  // closedSet.add(source);
  while (openSet.length !== 0) {
    let current = getLowestFPointInOpenSet();
    let rect = JSON.parse(current) as Point;
    {
      let rectangle = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'rect',
      );
      rectangle.setAttribute('fill', 'green');
      rectangle.setAttribute('x', `${rect.x - 2}`);
      rectangle.setAttribute('y', `${rect.y - 2}`);
      rectangle.setAttribute('width', `${4}`);
      rectangle.setAttribute('height', `${4}`);
      svg.appendChild(rectangle);
    }
    if (current === target) {
      break;
    }

    openSet.splice(openSet.indexOf(current), 1);

    let neighbors = neighborMap.get(current);

    for (let key in neighbors) {
      let neighbor = neighbors[key];

      let tempG = gScore[current] + 1;
      if (gScore[neighbor] == null) {
        gScore[neighbor] = Number.MAX_SAFE_INTEGER;
      }
      if (tempG < gScore[neighbor]) {
        gScore[neighbor] = tempG;
        // openSet[neighbor].f = 2 * heuristic(neighbor, target);
        fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, target);
        openSet.push(neighbor);
        if (neighbor === target) {
          debugger;
        }
        cameFromMap.set(neighbor, current);
      }
    }
  }

  console.log('==============');
  console.log(source, target);
  console.log(neighborMap);
  console.log(cameFromMap);

  let d = '';
  let current = target;
  while (current) {
    let currentPoint = JSON.parse(current) as Point;
    if (current === source) {
      d = `M ${currentPoint.x} ${currentPoint.y}` + d;
      break;
    } else {
      d = ` L ${currentPoint.x} ${currentPoint.y}` + d;
    }
    let a = current;
    current = cameFromMap.get(current);
    if (current === undefined) {
      debugger;
    }
  }
  console.log(d);
  return d;
}
