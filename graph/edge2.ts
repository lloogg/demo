// import { Graph } from './graph';
// import { Point } from './point';
// import { Node } from './node';
// let xmlns = 'http://www.w3.org/2000/svg';

// type Dir = 'top' | 'right' | 'bottom' | 'left';

// interface Line {
//   dir: Dir;
//   source: Point;
//   target: Point;
// }
// export class Edge {
//   d: string = null;
//   g: SVGGElement = null;
//   handle: SVGPathElement = null;
//   path: SVGPathElement = null;
//   points: Point[] = [];
//   lines: Line[] = [];
//   arrowStart: SVGPathElement = null;
//   // arrowStart 不闭合，因此点击不能触发事件
//   arrowStartHandle: SVGPathElement = null;
//   arrowEnd: SVGPathElement = null;
//   firstLine: Line = null;
//   lastLine: Line = null;
//   tempX: number;
//   tempY: number;
//   graph: Graph;
//   sourceNode: Node;
//   targetNode: Node;
//   chosenLine: Line;
//   constructor(graph: Graph, d: string) {
//     this.graph = graph;
//     this.d = d;
//     this.g = document.createElementNS(xmlns, 'g') as SVGGElement;
//     this.g.setAttribute('transform', 'translate(0.5, 0.5)');
//     this.handle = document.createElementNS(xmlns, 'path') as SVGPathElement;
//     this.handle.setAttribute('fill', 'none');
//     this.handle.setAttribute('stroke', 'lightblue');
//     this.handle.setAttribute('stroke-width', '5');
//     this.handle.setAttribute('stroke-linejoin', 'bevel');
//     this.handle.setAttribute('d', d);
//     this.path = document.createElementNS(xmlns, 'path') as SVGPathElement;
//     this.path.setAttribute('fill', 'none');
//     this.path.setAttribute('stroke', 'black');
//     this.path.setAttribute('stroke-width', '1');
//     this.path.setAttribute('stroke-linejoin', 'bevel');
//     this.path.setAttribute('d', d);
//     // 点击无事件
//     this.path.style.pointerEvents = 'none';

//     this.g.appendChild(this.handle);
//     this.g.appendChild(this.path);
//     // this.graph.g.appendChild(this.g);
//     this.graph.g.insertBefore(this.g, this.graph.g.firstChild);

//     document.addEventListener('mouseup', () => {
//       document.onmousemove = null;
//       document.body.style.cursor = 'initial';
//     });

//     // 提取纯数字
//     let xyArr = d.split(' ').filter((p) => {
//       return /\d/.test(p);
//     });
//     // 分割成点
//     for (let i = 0; i < xyArr.length; i += 2) {
//       let temp = xyArr.slice(i, i + 2);
//       let point: Point = {
//         x: parseInt(temp[0]),
//         y: parseInt(temp[1]),
//       };
//       this.points.push(point);
//     }

//     // 提取线
//     for (let i = 0; i < this.points.length - 1; i++) {
//       let source = this.points[i];
//       let target = this.points[i + 1];
//       let dir = this.getDir(source.x, source.y, target.x, target.y);
//       this.lines.push({
//         dir,
//         source,
//         target,
//       });
//     }

//     // 设置第一条线
//     this.firstLine = this.lines[0];
//     // 设置最后一条线
//     this.lastLine = this.lines[this.lines.length - 1];

//     this.addArrowStart();
//     this.drawArrowStart();
//     this.addArrowEnd();
//     this.drawArrowEnd();

//     const lineMouseMove = (e: MouseEvent) => {
//       if (!e.ctrlKey) {
//         // if (this.sourceNode || this.targetNode) {
//         if (this.chosenLine) {
//           if (
//             this.chosenLine.dir === 'top' ||
//             this.chosenLine.dir === 'bottom'
//           ) {
//             this.chosenLine.source.x = e.offsetX;
//             this.chosenLine.target.x = e.offsetX;
//           } else {
//             this.chosenLine.source.y = e.offsetY;
//             this.chosenLine.target.y = e.offsetY;
//           }
//         }
//         let newD = '';
//         for (let i = 0; i < this.points.length; i++) {
//           let point = this.points[i];
//           if (i === 0) {
//             newD += `M ${point.x} ${point.y}`;
//           } else {
//             newD += ` L ${point.x} ${point.y}`;
//           }
//         }
//         this.d = newD;
//         this.path.setAttribute('d', newD);
//         this.handle.setAttribute('d', newD);
//         if (this.chosenLine === this.lastLine) {
//           this.drawArrowEnd();
//         } else if (this.chosenLine === this.firstLine) {
//           this.drawArrowStart();
//         }
//         this.changeArrowDirection();
//         this.graph.resize();
//       } else {
//         for (let i = 0; i < this.points.length; i++) {
//           let point = this.points[i];
//           point.x = point.x + e.offsetX - this.tempX;
//           point.y = point.y + e.offsetY - this.tempY;
//         }
//         let newD = '';
//         for (let i = 0; i < this.points.length; i++) {
//           let point = this.points[i];
//           if (i === 0) {
//             newD += `M ${point.x} ${point.y}`;
//           } else {
//             newD += ` L ${point.x} ${point.y}`;
//           }
//         }
//         this.tempX = e.offsetX;
//         this.tempY = e.offsetY;
//         this.d = newD;
//         this.path.setAttribute('d', newD);
//         this.handle.setAttribute('d', newD);
//         this.drawArrowEnd();
//         this.drawArrowStart();
//       }
//     };

//     this.handle.addEventListener('mousedown', (e) => {
//       e.stopPropagation();
//       this.setSelect(true);
//       this.tempX = e.offsetX;
//       this.tempY = e.offsetY;

//       for (let i = 0; i < this.lines.length; i++) {
//         // 如果这是一条线，不可能 x 相同并且 y 相同

//         let line = this.lines[i];
//         let source = line.source;
//         let target = line.target;
//         let xMin = source.x < target.x ? source.x : target.x;
//         let xMax = source.x < target.x ? target.x : source.x;
//         let yMin = source.y < target.y ? source.y : target.y;
//         let yMax = source.y < target.y ? target.y : source.y;

//         if (line.dir === 'top' || line.dir === 'bottom') {
//           if (
//             this.tempY < yMax &&
//             this.tempY > yMin &&
//             Math.abs(this.tempX - source.x) < 5
//           ) {
//             this.chosenLine = line;
//             break;
//           }
//         } else {
//           let;
//         }
//       }

//       document.addEventListener('mousemove', lineMouseMove);

//       //   document.onmousemove = (e) => {
//       //     if (e.ctrlKey) {
//       //       for (let i = 0; i < this.points.length; i++) {
//       //         let point = this.points[i];
//       //         point.x = point.x + e.offsetX - x;
//       //         point.y = point.y + e.offsetY - y;
//       //       }
//       //       let newD = '';
//       //       for (let i = 0; i < this.points.length; i++) {
//       //         let point = this.points[i];
//       //         if (i === 0) {
//       //           newD += `M ${point.x} ${point.y}`;
//       //         } else {
//       //           newD += ` L ${point.x} ${point.y}`;
//       //         }
//       //       }
//       //       x = e.offsetX;
//       //       y = e.offsetY;
//       //       this.d = newD;
//       //       this.path.setAttribute('d', newD);
//       //       this.handle.setAttribute('d', newD);
//       //       this.drawArrowEnd();
//       //       this.drawArrowStart();
//       //     } else {
//       //       let x = e.offsetX;
//       //       let y = e.offsetY;
//       //       if (chosenLine) {
//       //         if (chosenLine.dir === 'left' || chosenLine.dir === 'right') {
//       //           chosenLine.source.y = y;
//       //           chosenLine.target.y = y;
//       //         } else if (
//       //           chosenLine.dir === 'top' ||
//       //           chosenLine.dir === 'bottom'
//       //         ) {
//       //           chosenLine.source.x = x;
//       //           chosenLine.target.x = x;
//       //         }
//       //       }
//       //       let newD = '';
//       //       for (let i = 0; i < this.points.length; i++) {
//       //         let point = this.points[i];
//       //         if (i === 0) {
//       //           newD += `M ${point.x} ${point.y}`;
//       //         } else {
//       //           newD += ` L ${point.x} ${point.y}`;
//       //         }
//       //       }
//       //       this.d = newD;
//       //       this.path.setAttribute('d', newD);
//       //       this.handle.setAttribute('d', newD);
//       //       if (chosenLine === this.lastLine) {
//       //         this.drawArrowEnd();
//       //       } else if (chosenLine === this.firstLine) {
//       //         this.drawArrowStart();
//       //       }
//       //       this.changeArrowDirection();
//       //     }
//       //   };
//     });
//     document.addEventListener('mouseup', () => {
//       document.removeEventListener('mousemove', lineMouseMove);
//     });
//   }

//   /**
//    * 线的方向，不可能出现 x1 === x2 并且 y1 === y2
//    * @param x1
//    * @param y1
//    * @param x2
//    * @param y2
//    * @returns
//    */
//   getDir(x1, y1, x2, y2): Dir {
//     if (x1 === x2) {
//       // return 'vertical';
//       if (y1 < y2) {
//         return 'bottom';
//       } else {
//         return 'top';
//       }
//     } else if (y1 === y2) {
//       if (x1 < x2) {
//         return 'right';
//       } else {
//         return 'left';
//       }
//     }
//   }

//   getLineDir(line: Line) {
//     return this.getDir(
//       line.source.x,
//       line.source.y,
//       line.target.x,
//       line.target.y,
//     );
//   }

//   addArrowStart() {
//     this.arrowStart = document.createElementNS(xmlns, 'path') as SVGPathElement;
//     this.arrowStart.setAttribute('stroke', 'black');
//     this.arrowStart.setAttribute('fill', 'none');
//     this.arrowStart.setAttribute('stroke-width', '1');
//     this.arrowStart.setAttribute('cursor', 'grab');
//     this.arrowStart.setAttribute('pointer-events', 'bounding-box');

//     this.g.appendChild(this.arrowStart);

//     this.arrowStartHandle = document.createElementNS(
//       xmlns,
//       'path',
//     ) as SVGPathElement;

//     const arrowStartMove = (e) => {
//       this.firstLine.source.y = e.offsetY;
//       this.firstLine.target.y = e.offsetY;
//       this.firstLine.source.x = e.offsetX;
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

//       this.drawArrowStart();
//       this.changeArrowDirection();

//       document.body.style.cursor = 'grab';
//     };

//     this.arrowStart.addEventListener('mousedown', (e) => {
//       e.stopPropagation();
//       document.addEventListener('mousemove', arrowStartMove);
//     });

//     document.addEventListener('mouseup', () => {
//       document.removeEventListener('mousemove', arrowStartMove);
//       document.body.style.cursor = 'initial';
//     });
//   }

//   addArrowEnd() {
//     this.arrowEnd = document.createElementNS(xmlns, 'path') as SVGPathElement;
//     this.arrowEnd.setAttribute('fill', 'black');
//     this.arrowEnd.setAttribute('cursor', 'grab');
//     this.g.appendChild(this.arrowEnd);

//     this.arrowEnd.addEventListener('mousedown', (e) => {
//       e.stopPropagation();
//       document.onmousemove = (e) => {
//         let nodes = this.graph.nodes;
//         for (let node of nodes) {
//           for (let port of node.ports) {
//             port.show();
//           }
//           // let port = node.port;
//           for (let port of node.ports) {
//             let portX = port.x;
//             let portY = port.y;
//             if (
//               Math.abs(e.offsetX - portX) < 20 &&
//               Math.abs(e.offsetY - portY) < 20
//             ) {
//               // connected
//               // this.hideArrowEnd();
//               port.hide();
//               this.lastLine.source.y = portY;
//               this.lastLine.target.y = portY;
//               this.lastLine.target.x = portX - 9;
//               let newD = '';
//               for (let i = 0; i < this.points.length; i++) {
//                 let point = this.points[i];
//                 if (i === 0) {
//                   newD += `M ${point.x} ${point.y}`;
//                 } else {
//                   newD += ` L ${point.x} ${point.y}`;
//                 }
//               }
//               this.d = newD;
//               this.path.setAttribute('d', newD);
//               this.handle.setAttribute('d', newD);
//               this.drawArrowEnd();
//               this.changeArrowDirection();
//               document.body.style.cursor = 'grab';
//               break;
//             } else {
//               this.lastLine.source.y = e.offsetY;
//               this.lastLine.target.y = e.offsetY;
//               this.lastLine.target.x = e.offsetX;
//               let newD = '';
//               for (let i = 0; i < this.points.length; i++) {
//                 let point = this.points[i];
//                 if (i === 0) {
//                   newD += `M ${point.x} ${point.y}`;
//                 } else {
//                   newD += ` L ${point.x} ${point.y}`;
//                 }
//               }
//               this.d = newD;
//               this.path.setAttribute('d', newD);
//               this.handle.setAttribute('d', newD);
//               this.drawArrowEnd();
//               this.changeArrowDirection();
//               document.body.style.cursor = 'grab';
//               this.graph.resize(
//                 this.lastLine.target.x,
//                 this.lastLine.target.y + 4,
//               );
//             }
//           }
//         }
//       };
//     });
//   }

//   drawArrowStart() {
//     if (this.firstLine.dir === 'right') {
//       let d = '';
//       d += `M ${this.firstLine.source.x - 4} ${this.firstLine.source.y - 4}`;
//       d += ` L ${this.firstLine.source.x} ${this.firstLine.source.y}`;
//       d += ` L ${this.firstLine.source.x - 4} ${this.firstLine.source.y + 4}`;
//       this.arrowStart.setAttribute('d', d);
//     } else if (this.firstLine.dir === 'top') {
//     } else if (this.firstLine.dir === 'bottom') {
//     } else if (this.firstLine.dir === 'left') {
//       let d = '';
//       d += `M ${this.firstLine.source.x + 4} ${this.firstLine.source.y - 4}`;
//       d += ` L ${this.firstLine.source.x} ${this.firstLine.source.y}`;
//       d += ` L ${this.firstLine.source.x + 4} ${this.firstLine.source.y + 4}`;
//       this.arrowStart.setAttribute('d', d);
//     }
//   }

//   drawArrowEnd() {
//     if (this.lastLine.dir === 'right') {
//       let d = '';
//       d += `M ${this.lastLine.target.x} ${this.lastLine.target.y - 4}`;
//       d += ` L ${this.lastLine.target.x + 8} ${this.lastLine.target.y}`;
//       d += ` L ${this.lastLine.target.x} ${this.lastLine.target.y + 4}`;
//       this.arrowEnd.setAttribute('d', d);
//     } else if (this.lastLine.dir === 'top') {
//     } else if (this.lastLine.dir === 'bottom') {
//     } else if (this.lastLine.dir === 'left') {
//       let d = '';
//       d += `M ${this.lastLine.target.x} ${this.lastLine.target.y - 4}`;
//       d += ` L ${this.lastLine.target.x - 8} ${this.lastLine.target.y}`;
//       d += ` L ${this.lastLine.target.x} ${this.lastLine.target.y + 4}`;
//       this.arrowEnd.setAttribute('d', d);
//     }
//   }

//   changeArrowDirection() {
//     // 如果最后一条线的方向变了，改变 arrowEnd 的 path
//     if (this.firstLine.dir !== this.getLineDir(this.firstLine)) {
//       this.firstLine.dir = this.getLineDir(this.firstLine);
//       this.drawArrowStart();
//     }

//     if (this.lastLine.dir !== this.getLineDir(this.lastLine)) {
//       this.lastLine.dir = this.getLineDir(this.lastLine);
//       this.drawArrowEnd();
//     }
//   }

//   setSelect(state: boolean) {
//     if (state) {
//       this.handle.style.opacity = '1';
//     } else {
//       this.handle.style.opacity = '0';
//     }
//   }

//   translate(x: number, y: number) {
//     for (let i = 0; i < this.points.length; i++) {
//       let point = this.points[i];
//       point.x = point.x + x;
//       point.y = point.y + y;
//     }
//     let newD = '';
//     for (let i = 0; i < this.points.length; i++) {
//       let point = this.points[i];
//       if (i === 0) {
//         newD += `M ${point.x} ${point.y}`;
//       } else {
//         newD += ` L ${point.x} ${point.y}`;
//       }
//     }

//     this.d = newD;
//     this.path.setAttribute('d', newD);
//     this.handle.setAttribute('d', newD);
//     this.drawArrowEnd();
//     this.drawArrowStart();
//   }

//   hideArrowEnd() {
//     this.arrowEnd.style.opacity = '0';
//   }
// }
