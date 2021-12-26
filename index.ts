let xmlns = 'http://www.w3.org/2000/svg';

document.addEventListener('mouseup', () => {
  document.onmousemove = null;
});
interface Point {
  x: number;
  y: number;
}
type DirType = 'horizontal' | 'vertical';
type DirInfo = 'top' | 'right' | 'bottom' | 'left';
interface Dir {
  type: DirType;
  info: DirInfo;
}
interface Line {
  dir: Dir;
  source: Point;
  target: Point;
}
class Edge {
  d: string = null;
  g: SVGGElement = null;
  svg: SVGSVGElement = document.getElementsByTagName('svg')[0];
  handle: SVGPathElement = null;
  path: SVGPathElement = null;
  points: Point[] = [];
  lines: Line[] = [];
  arrowEnd: SVGPathElement = null;
  constructor(d: string) {
    this.d = d;
    this.g = document.createElementNS(xmlns, 'g') as SVGGElement;
    this.g.setAttribute('transform', 'translate(0.5, 0.5)');
    this.handle = document.createElementNS(xmlns, 'path') as SVGPathElement;
    this.handle.setAttribute('fill', 'none');
    this.handle.setAttribute('stroke', 'aqua');
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
    this.g.appendChild(this.handle);
    this.g.appendChild(this.path);
    this.svg.appendChild(this.g);

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', this.dragPath.apply(this));
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
      this.lines.push({
        dir,
        source,
        target,
      });
    }

    this.drawArrowEnd();
    this.handle.addEventListener('mousedown', (e) => {
      console.log('handle mousedown');
      let x = e.offsetX;
      let y = e.offsetY;
      let chosenLine: Line = null;
      for (let i = 0; i < this.lines.length; i++) {
        // 如果这是一条线，不可能 x 相同并且 y 相同

        let line = this.lines[i];
        let source = line.source;
        let target = line.target;
        let xMin = source.x < target.x ? source.x : target.x;
        let xMax = source.x < target.x ? target.x : source.x;
        let yMin = source.y < target.y ? source.y : target.y;
        let yMax = source.y < target.y ? target.y : source.y;
        if (line.dir.type === 'horizontal') {
          // 线是水平的，那么 source.y === target.y
          if (x < xMax && x > xMin && Math.abs(y - source.y) < 5) {
            chosenLine = line;
            break;
          }
        } else if (line.dir.type === 'vertical') {
          if (y < yMax && y > yMin && Math.abs(x - source.x) < 5) {
            chosenLine = line;
            break;
          }
        }
      }
      // document.onmousemove = (e) => {
      //   let x = e.offsetX;
      //   let y = e.offsetY;
      //   if (chosenLine) {
      //     if (chosenLine.dir.type === 'horizontal') {
      //       chosenLine.source.y = y;
      //       chosenLine.target.y = y;
      //     } else if (chosenLine.dir.type === 'vertical') {
      //       chosenLine.source.x = x;
      //       chosenLine.target.x = x;
      //     }
      //   }
      //   let newD = '';
      //   for (let i = 0; i < this.points.length; i++) {
      //     let point = this.points[i];
      //     if (i === 0) {
      //       newD += `M ${point.x} ${point.y}`;
      //     } else {
      //       newD += ` L ${point.x} ${point.y}`;
      //     }
      //   }
      //   this.d = newD;
      //   this.path.setAttribute('d', newD);
      //   this.handle.setAttribute('d', newD);
      // };
      document.addEventListener('mousemove', this.dragPath.call(chosenLine));
    });
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
        return {
          type: 'vertical',
          info: 'top',
        };
      } else {
        return {
          type: 'vertical',
          info: 'top',
        };
      }
    } else if (y1 === y2) {
      if (x1 < x2) {
        return {
          type: 'horizontal',
          info: 'right',
        };
      } else {
        return {
          type: 'horizontal',
          info: 'left',
        };
      }
    }
  }

  drawArrowEnd() {
    let lastLine = this.lines[this.lines.length - 1];
    if (lastLine.dir.info === 'right') {
      this.arrowEnd = document.createElementNS(xmlns, 'path') as SVGPathElement;
      this.arrowEnd.setAttribute('fill', 'black');
      let d = '';
      d += `M ${lastLine.target.x} ${lastLine.target.y - 4}`;
      d += ` L ${lastLine.target.x + 8} ${lastLine.target.y}`;
      d += ` L ${lastLine.target.x} ${lastLine.target.y + 4}`;
      this.arrowEnd.setAttribute('d', d);
      this.g.appendChild(this.arrowEnd);
    } else if (lastLine.dir.info === 'top') {
      this.arrowEnd = document.createElementNS(xmlns, 'path') as SVGPathElement;
    } else if (lastLine.dir.info === 'bottom') {
      this.arrowEnd = document.createElementNS(xmlns, 'path') as SVGPathElement;
    } else if (lastLine.dir.info === 'left') {
      this.arrowEnd = document.createElementNS(xmlns, 'path') as SVGPathElement;
    }
    this.arrowEnd.addEventListener('mousedown', (e) => {
      document.onmousemove = () => {};
    });
  }

  dragPath(chosenLine: Line, e?: MouseEvent) {
    let x = e.offsetX;
    let y = e.offsetY;
    if (chosenLine) {
      if (chosenLine.dir.type === 'horizontal') {
        chosenLine.source.y = y;
        chosenLine.target.y = y;
      } else if (chosenLine.dir.type === 'vertical') {
        chosenLine.source.x = x;
        chosenLine.target.x = x;
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
  }

  dragArrowEnd(e?: MouseEvent) {}
}

let edge = new Edge('M 10 100 L 15 100 L 15 120 L 135 120 L 135 100 L 140 100');
