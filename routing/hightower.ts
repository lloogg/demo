// f(n) = g(n) + h(n)
// closedSet: nodes that alreay been evaluated
// openSet: nodes need to be evaluated
import { createSvg } from './util';
import { Point } from '../graph/point';

let xmlns = 'http://www.w3.org/2000/svg';
type Dir = 'top' | 'right' | 'bottom' | 'left';

class Line {
  dir: Dir;
  start: Point;
  end: Point;
  constructor(dir: Dir, start: Point, end: Point) {
    this.dir = dir;
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
class Edge {
  d: string = null;
  g: SVGGElement = null;
  handle: SVGPathElement = null;
  path: SVGPathElement = null;
  points: Point[] = [];
  lines: Line[] = [];
  arrowStart: SVGPathElement = null;
  // arrowStart 不闭合，因此点击不能触发事件
  arrowStartHandle: SVGPathElement = null;
  arrowEnd: SVGPathElement = null;
  firstLine: Line = null;
  lastLine: Line = null;
  tempX: number;
  tempY: number;
  sourceNode: Node;
  targetNode: Node;
  chosenLine: Line;
  constructor(d: string) {
    this.d = d;
    this.g = document.createElementNS(xmlns, 'g') as SVGGElement;
    this.handle = document.createElementNS(xmlns, 'path') as SVGPathElement;
    this.handle.setAttribute('fill', 'none');
    this.handle.setAttribute('stroke', 'lightblue');
    this.handle.setAttribute('stroke-width', '5');
    this.handle.setAttribute('stroke-linejoin', 'bevel');
    this.handle.setAttribute('d', d);
    this.path = document.createElementNS(xmlns, 'path') as SVGPathElement;
    this.path.setAttribute('fill', 'none');
    this.path.setAttribute('stroke', 'black');
    this.path.setAttribute('stroke-width', '1');
    this.path.setAttribute('stroke-linejoin', 'bevel');
    this.path.setAttribute('d', d);
    // 点击无事件
    this.path.style.pointerEvents = 'none';
    this.path.style.zIndex = '-2';
    this.handle.style.zIndex = '-2';
    this.g.appendChild(this.handle);
    this.g.appendChild(this.path);
    // this.graph.g.appendChild(this.g);

    document.addEventListener('mouseup', () => {
      document.onmousemove = null;
      // document.body.style.cursor = 'initial';
    });

    // 提取纯数字
    let xyArr = d.split(' ').filter((p) => {
      return /\d/.test(p);
    });
    // 分割成点
    for (let i = 0; i < xyArr.length; i += 2) {
      let temp = xyArr.slice(i, i + 2);
      let point: Point = {
        x: parseInt(temp[0]),
        y: parseInt(temp[1]),
      };
      this.points.push(point);
    }

    // 提取线
    for (let i = 0; i < this.points.length - 1; i++) {
      let source = this.points[i];
      let target = this.points[i + 1];
      let dir = this.getDir(source.x, source.y, target.x, target.y);
      this.lines.push(new Line(dir, source, target));
    }

    // 设置第一条线
    this.firstLine = this.lines[0];
    // 设置最后一条线
    this.lastLine = this.lines[this.lines.length - 1];

    this.addArrowStart();
    this.drawArrowStart();
    this.addArrowEnd();
    this.drawArrowEnd();

    const lineMouseMove = (e: MouseEvent) => {
      if (!e.shiftKey) {
        // if (this.sourceNode || this.targetNode) {
        if (this.chosenLine) {
          if (
            this.chosenLine.dir === 'left' ||
            this.chosenLine.dir === 'right'
          ) {
            this.chosenLine.start.y = e.offsetY;
            this.chosenLine.end.y = e.offsetY;
          } else if (
            this.chosenLine.dir === 'top' ||
            this.chosenLine.dir === 'bottom'
          ) {
            this.chosenLine.start.x = e.offsetX;
            this.chosenLine.end.x = e.offsetX;
          }
        }
        let newD = '';
        for (let i = 0; i < this.points.length; i++) {
          let point = this.points[i];
          if (i === 0) {
            newD += `M ${point.x} ${point.y}`;
          } else {
            newD += ` L ${point.x} ${point.y}`;
          }
        }
        this.d = newD;
        this.path.setAttribute('d', newD);
        this.handle.setAttribute('d', newD);
        if (this.chosenLine === this.lastLine) {
          this.drawArrowEnd();
        } else if (this.chosenLine === this.firstLine) {
          this.drawArrowStart();
        }
        this.changeArrowDirection();
      } else {
        for (let i = 0; i < this.points.length; i++) {
          let point = this.points[i];
          point.x = point.x + e.offsetX - this.tempX;
          point.y = point.y + e.offsetY - this.tempY;
        }
        let newD = '';
        for (let i = 0; i < this.points.length; i++) {
          let point = this.points[i];
          if (i === 0) {
            newD += `M ${point.x} ${point.y}`;
          } else {
            newD += ` L ${point.x} ${point.y}`;
          }
        }
        this.tempX = e.offsetX;
        this.tempY = e.offsetY;
        this.d = newD;
        this.path.setAttribute('d', newD);
        this.handle.setAttribute('d', newD);
        this.drawArrowEnd();
        this.drawArrowStart();
      }
    };

    this.handle.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      this.setSelect(true);
      this.tempX = e.offsetX;
      this.tempY = e.offsetY;

      for (let i = 0; i < this.lines.length; i++) {
        // 如果这是一条线，不可能 x 相同并且 y 相同

        let line = this.lines[i];
        let source = line.start;
        let target = line.end;
        let xMin = source.x < target.x ? source.x : target.x;
        let xMax = source.x < target.x ? target.x : source.x;
        let yMin = source.y < target.y ? source.y : target.y;
        let yMax = source.y < target.y ? target.y : source.y;
        if (line.dir === 'left' || line.dir === 'right') {
          // 线是水平的，那么 source.y === target.y
          if (
            this.tempX < xMax &&
            this.tempX > xMin &&
            Math.abs(this.tempY - source.y) < 5
          ) {
            this.chosenLine = line;
            break;
          }
        } else if (line.dir === 'top' || line.dir === 'bottom') {
          if (
            this.tempY < yMax &&
            this.tempY > yMin &&
            Math.abs(this.tempX - source.x) < 5
          ) {
            this.chosenLine = line;
            break;
          }
        }
      }

      document.addEventListener('mousemove', lineMouseMove);

      //   document.onmousemove = (e) => {
      //     if (e.ctrlKey) {
      //       for (let i = 0; i < this.points.length; i++) {
      //         let point = this.points[i];
      //         point.x = point.x + e.offsetX - x;
      //         point.y = point.y + e.offsetY - y;
      //       }
      //       let newD = '';
      //       for (let i = 0; i < this.points.length; i++) {
      //         let point = this.points[i];
      //         if (i === 0) {
      //           newD += `M ${point.x} ${point.y}`;
      //         } else {
      //           newD += ` L ${point.x} ${point.y}`;
      //         }
      //       }
      //       x = e.offsetX;
      //       y = e.offsetY;
      //       this.d = newD;
      //       this.path.setAttribute('d', newD);
      //       this.handle.setAttribute('d', newD);
      //       this.drawArrowEnd();
      //       this.drawArrowStart();
      //     } else {
      //       let x = e.offsetX;
      //       let y = e.offsetY;
      //       if (chosenLine) {
      //         if (chosenLine.dir === 'left' || chosenLine.dir === 'right') {
      //           chosenLine.source.y = y;
      //           chosenLine.target.y = y;
      //         } else if (
      //           chosenLine.dir === 'top' ||
      //           chosenLine.dir === 'bottom'
      //         ) {
      //           chosenLine.source.x = x;
      //           chosenLine.target.x = x;
      //         }
      //       }
      //       let newD = '';
      //       for (let i = 0; i < this.points.length; i++) {
      //         let point = this.points[i];
      //         if (i === 0) {
      //           newD += `M ${point.x} ${point.y}`;
      //         } else {
      //           newD += ` L ${point.x} ${point.y}`;
      //         }
      //       }
      //       this.d = newD;
      //       this.path.setAttribute('d', newD);
      //       this.handle.setAttribute('d', newD);
      //       if (chosenLine === this.lastLine) {
      //         this.drawArrowEnd();
      //       } else if (chosenLine === this.firstLine) {
      //         this.drawArrowStart();
      //       }
      //       this.changeArrowDirection();
      //     }
      //   };
    });
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', lineMouseMove);
    });
  }

  isStartPoint(point: Point) {
    return point === this.points[0];
  }

  isEndPoint(point: Point) {
    return point === this.points[this.points.length - 1];
  }

  /**
   * 线的方向，不可能出现 x1 === x2 并且 y1 === y2
   * @param x1
   * @param y1
   * @param x2
   * @param y2
   * @returns
   */
  getDir(x1, y1, x2, y2): Dir {
    if (x1 === x2) {
      // return 'vertical';
      if (y1 < y2) {
        return 'bottom';
      } else {
        return 'top';
      }
    } else if (y1 === y2) {
      if (x1 < x2) {
        return 'right';
      } else {
        return 'left';
      }
    }
  }

  getLineDir(line: Line) {
    return this.getDir(line.start.x, line.start.y, line.end.x, line.end.y);
  }

  addArrowStart() {
    this.arrowStart = document.createElementNS(xmlns, 'path') as SVGPathElement;
    this.arrowStart.setAttribute('stroke', 'black');
    this.arrowStart.setAttribute('fill', 'none');
    this.arrowStart.setAttribute('stroke-width', '1');
    // this.arrowStart.setAttribute('cursor', 'grab');
    this.arrowStart.setAttribute('pointer-events', 'bounding-box');

    this.g.appendChild(this.arrowStart);

    this.arrowStartHandle = document.createElementNS(
      xmlns,
      'path',
    ) as SVGPathElement;

    const arrowStartMove = (e: MouseEvent) => {
      this.update();
    };

    this.arrowStart.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      document.addEventListener('mousemove', arrowStartMove);
    });

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', arrowStartMove);
      document.body.style.cursor = 'initial';
    });
  }

  addArrowEnd() {
    this.arrowEnd = document.createElementNS(xmlns, 'path') as SVGPathElement;
    this.arrowEnd.setAttribute('fill', 'black');
    // this.arrowEnd.setAttribute('cursor', 'grab');
    this.g.appendChild(this.arrowEnd);

    const arrowEndMove = (e: MouseEvent) => {};

    this.arrowEnd.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      document.addEventListener('mousemove', arrowEndMove);
    });

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', arrowEndMove);
      document.body.style.cursor = 'initial';
    });
  }

  /**
   * 更新 source 箭头
   */
  drawArrowStart() {
    if (this.firstLine.dir === 'right') {
      let d = '';
      d += `M ${this.firstLine.start.x - 4} ${this.firstLine.start.y - 4}`;
      d += ` L ${this.firstLine.start.x} ${this.firstLine.start.y}`;
      d += ` L ${this.firstLine.start.x - 4} ${this.firstLine.start.y + 4}`;
      this.arrowStart.setAttribute('d', d);
    } else if (this.firstLine.dir === 'top') {
    } else if (this.firstLine.dir === 'bottom') {
    } else if (this.firstLine.dir === 'left') {
      let d = '';
      d += `M ${this.firstLine.start.x + 4} ${this.firstLine.start.y - 4}`;
      d += ` L ${this.firstLine.start.x} ${this.firstLine.start.y}`;
      d += ` L ${this.firstLine.start.x + 4} ${this.firstLine.start.y + 4}`;
      this.arrowStart.setAttribute('d', d);
    }
  }

  /**
   * 更新 target 箭头
   */
  drawArrowEnd() {
    if (this.lastLine.dir === 'right') {
      let d = '';
      d += `M ${this.lastLine.end.x} ${this.lastLine.end.y - 4}`;
      d += ` L ${this.lastLine.end.x + 8} ${this.lastLine.end.y}`;
      d += ` L ${this.lastLine.end.x} ${this.lastLine.end.y + 4}`;
      this.arrowEnd.setAttribute('d', d);
    } else if (this.lastLine.dir === 'top') {
    } else if (this.lastLine.dir === 'bottom') {
    } else if (this.lastLine.dir === 'left') {
      let d = '';
      d += `M ${this.lastLine.end.x} ${this.lastLine.end.y - 4}`;
      d += ` L ${this.lastLine.end.x - 8} ${this.lastLine.end.y}`;
      d += ` L ${this.lastLine.end.x} ${this.lastLine.end.y + 4}`;
      this.arrowEnd.setAttribute('d', d);
    }
  }

  /**
   * 更新连线两端箭头方向
   */
  changeArrowDirection() {
    if (this.firstLine.dir !== this.getLineDir(this.firstLine)) {
      this.firstLine.dir = this.getLineDir(this.firstLine);
      this.drawArrowStart();
    }

    if (this.lastLine.dir !== this.getLineDir(this.lastLine)) {
      this.lastLine.dir = this.getLineDir(this.lastLine);
      this.drawArrowEnd();
    }
  }

  setSelect(state: boolean) {
    if (state) {
      this.handle.style.opacity = '1';
    } else {
      this.handle.style.opacity = '0';
    }
  }

  translate(x: number, y: number) {
    for (let i = 0; i < this.points.length; i++) {
      let point = this.points[i];
      point.x = point.x + x;
      point.y = point.y + y;
    }
    this.update();
  }

  update(): string {
    let newD = '';
    for (let i = 0; i < this.points.length; i++) {
      let point = this.points[i];
      if (i === 0) {
        newD += `M ${point.x} ${point.y}`;
      } else {
        newD += ` L ${point.x} ${point.y}`;
      }
    }
    this.d = newD;

    // 提取线
    this.lines = [];
    for (let i = 0; i < this.points.length - 1; i++) {
      let source = this.points[i];
      let target = this.points[i + 1];
      let dir = this.getDir(source.x, source.y, target.x, target.y);
      this.lines.push(new Line(dir, source, target));
    }

    // 设置第一条线
    this.firstLine = this.lines[0];
    // 设置最后一条线
    this.lastLine = this.lines[this.lines.length - 1];

    this.path.setAttribute('d', this.d);
    this.handle.setAttribute('d', this.d);
    this.drawArrowStart();
    this.drawArrowEnd();
    this.changeArrowDirection();
    // document.body.style.cursor = 'grab';
    return newD;
  }

  documentMouseMove(e: MouseEvent) {}
}
class Rectangle {
  x;
  y;
  width;
  height;
  topLine: Line;
  rightLine: Line;
  bottomLine: Line;
  leftLine: Line;
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.topLine = new Line(null, new Point(x, y), new Point(x + width, y));
    this.bottomLine = new Line(
      null,
      new Point(x, y + height),
      new Point(x + width, y + height),
    );
    this.leftLine = new Line(null, new Point(x, y), new Point(x, y + height));
    this.rightLine = new Line(
      null,
      new Point(x + width, y),
      new Point(x + width, y + height),
    );
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
}

let width = 1000;
let height = 1000;
let svg = createSvg(width, height);
let rectangles: Rectangle[] = [];

type FourDirection = {
  [key in Dir]?: Rectangle;
};

function main() {
  rectangles.push(new Rectangle(30, 30, 150, 350));
  rectangles.push(new Rectangle(230, 30, 150, 200));
  rectangles.push(new Rectangle(200, 30, 10, 300));
  rectangles.push(new Rectangle(20, 430, 880, 20));
  rectangles.push(new Rectangle(20, 450, 20, 200));
  rectangles.push(new Rectangle(880, 450, 20, 200));
  rectangles.push(new Rectangle(40, 650, 400, 20));
  rectangles.push(new Rectangle(430, 480, 20, 180));
  rectangles.push(new Rectangle(40, 550, 200, 20));
  rectangles.push(new Rectangle(60, 450, 20, 200));

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
  let edge: Edge;
  svg.addEventListener('click', (e) => {
    // const source = new Point(
    //   Math.floor(Math.random() * width),
    //   Math.floor(Math.random() * height),
    // );
    const source = new Point(100, 2);
    const target = new Point(e.offsetX, e.offsetY);
    // const target = new Point(878, 451);
    let slines: Line[] = [];

    let tlines: Line[] = [];
    // let points:Point[] = [source, target];
    let smap = new Map<Point, FourDirection>();
    let tmap = new Map<Point, FourDirection>();
    smap.set(source, null);
    tmap.set(target, null);

    let ok = false;
    let loop = 30;
    const temp = loop;
    while (!ok && loop > 0) {
      loop -= 1;

      //   slines = [];
      //   tlines = [];
      getLines(smap, slines, null);
      getLines(tmap, tlines, null);
      for (let sline of slines) {
        for (let tline of tlines) {
          if (sline.intersectsWithLine(tline)) {
            console.log(true, temp - loop);
            ok = true;
            //   let sPath = document.createElementNS(
            //     'http://www.w3.org/2000/svg',
            //     'path',
            //   );
            //   let tPath = document.createElementNS(
            //     'http://www.w3.org/2000/svg',
            //     'path',
            //   );
            //   sPath.setAttribute(
            //     'd',
            //     `M ${sline.start.x} ${sline.start.y} L ${sline.end.x} ${sline.end.y}`,
            //   );
            //   sPath.setAttribute('stroke', 'black');
            //   sPath.setAttribute('stroke-width', '1');
            //   tPath.setAttribute(
            //     'd',
            //     `M ${tline.start.x} ${tline.start.y} L ${tline.end.x} ${tline.end.y}`,
            //   );
            //   tPath.setAttribute('stroke', 'black');
            //   tPath.setAttribute('stroke-width', '1');
            //   svg.appendChild(sPath);
            //   svg.appendChild(tPath);
          }
        }
      }
    }
  });
}

function getLines(map: Map<Point, FourDirection>, lines: Line[], points) {
  let newLines = [];
  let tempMap = new Map<Point, FourDirection>(map);
  map.clear();
  for (let point of Array.from(tempMap.keys())) {
    if (tempMap.get(point) == null) {
      tempMap.set(point, {});
    }
    for (let rectangle of rectangles) {
      // top
      if (
        rectangle.x < point.x &&
        rectangle.x + rectangle.width > point.x &&
        point.y > rectangle.y + rectangle.height
      ) {
        if (!tempMap.get(point).top) {
          tempMap.get(point).top = rectangle;
        } else if (
          tempMap.get(point).top.y + tempMap.get(point).top.height <
          rectangle.y + rectangle.height
        ) {
          tempMap.get(point).top = rectangle;
        }
      }
      // left
      if (
        rectangle.y < point.y &&
        rectangle.y + rectangle.height > point.y &&
        rectangle.x + rectangle.width < point.x
      ) {
        if (!tempMap.get(point).left) {
          tempMap.get(point).left = rectangle;
        } else if (
          tempMap.get(point).left.x + tempMap.get(point).left.width <
          rectangle.x + rectangle.width
        ) {
          tempMap.get(point).left = rectangle;
        }
      }
      // bottom
      if (
        rectangle.x < point.x &&
        rectangle.x + rectangle.width > point.x &&
        point.y < rectangle.y
      ) {
        if (!tempMap.get(point).bottom) {
          tempMap.get(point).bottom = rectangle;
        } else if (tempMap.get(point).bottom.y > rectangle.y) {
          tempMap.get(point).bottom = rectangle;
        }
      }
      // right
      if (
        rectangle.y < point.y &&
        rectangle.y + rectangle.height > point.y &&
        rectangle.x > point.x
      ) {
        if (!tempMap.get(point).right) {
          tempMap.get(point).right = rectangle;
        } else if (tempMap.get(point).right.x > rectangle.x) {
          tempMap.get(point).right = rectangle;
        }
      }
    }

    let { left, right, top, bottom } = tempMap.get(point);
    // left
    if (left) {
      if (left.x + left.width + 1 !== point.x) {
        const escapePoint = new Point(left.x + left.width + 1, point.y);
        newLines.push(new Line('left', point, escapePoint));
        map.set(escapePoint, null);
      }
    } else {
      newLines.push(new Line('left', point, new Point(1, point.y)));
    }

    // right
    if (right) {
      if (right.x - 1 !== point.x) {
        const escapePoint = new Point(right.x - 1, point.y);
        newLines.push(new Line('right', point, escapePoint));
        map.set(escapePoint, null);
      }
    } else {
      newLines.push(new Line('right', point, new Point(width - 1, point.y)));
    }

    // top
    if (top) {
      if (top.y + top.height + 1 !== point.y) {
        const escapePoint = new Point(point.x, top.y + top.height + 1);
        newLines.push(new Line('top', point, escapePoint));
        map.set(escapePoint, null);
      }
    } else {
      newLines.push(new Line('top', point, new Point(point.x, 1)));
    }

    // bottom
    if (bottom) {
      if (bottom.y - 1 !== point.y) {
        const escapePoint = new Point(point.x, bottom.y - 1);
        newLines.push(new Line('bottom', point, escapePoint));
        map.set(escapePoint, null);
      }
    } else {
      newLines.push(new Line('bottom', point, new Point(point.x, height - 1)));
    }

    if (left && left.x + left.width + 1 === point.x) {
      if (!top || top.y + top.height < left.y - 1) {
        map.set(new Point(point.x, left.y - 1), null);
      }
      if (!bottom || bottom.y > left.y + left.height + 1) {
        map.set(new Point(point.x, left.y + left.height + 1), null);
      }
    }
    if (right && right.x - 1 === point.x) {
      if (!top || top.y + top.height < right.y - 1) {
        console.log('right top set');
        map.set(new Point(point.x, right.y - 1), null);
      }
      if (!bottom || bottom.y > right.y + right.height + 1) {
        console.log('right bottom set');
        // console.log(right.y + right.height + 1);
        map.set(new Point(point.x, right.y + right.height + 1), null);
      }
    }
    if (bottom && bottom.y - 1 === point.y) {
      if (!right || right.x > bottom.x + bottom.width + 1) {
        map.set(new Point(bottom.x + bottom.width + 1, point.y), null);
      }
      if (!left || left.x + left.width + 1 < bottom.x) {
        map.set(new Point(bottom.x - 1, point.y), null);
      }
    }
    if (top && top.y + top.height + 1 === point.y) {
      if (!right || right.x > top.x + top.width + 1) {
        map.set(new Point(top.x + top.width + 1, point.y), null);
      }
      if (!left || left.x + left.width + 1 < top.x) {
        map.set(new Point(top.x - 1, point.y), null);
      }
    }

    // for (let line of newLines) {
    //   let sPath = document.createElementNS(
    //     'http://www.w3.org/2000/svg',
    //     'path',
    //   );

    //   sPath.setAttribute(
    //     'd',
    //     `M ${line.start.x} ${line.start.y} L ${line.end.x} ${line.end.y}`,
    //   );
    //   var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    //   sPath.setAttribute('stroke', 'black');
    //   //   sPath.setAttribute('stroke', '#' + randomColor);
    //   sPath.setAttribute('stroke-width', '1');

    //   svg.appendChild(sPath);
    // }
  }
  lines.push(...newLines);
}
main();
