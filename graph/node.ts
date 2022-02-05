import { Graph } from './graph';
import { Point } from './point';
import { Port } from './port';

export class Node {
  x: number;
  y: number;
  width: number;
  height: number;
  vertex: SVGRectElement;
  g: SVGGElement = null;
  ports: Port[] = [];
  graph: Graph;
  bg: SVGRectElement;
  points: Point[] = [];
  tempX: number;
  tempY: number;
  constructor(
    graph: Graph,
    x: string,
    y: string,
    width: string,
    height: string,
  ) {
    this.graph = graph;
    this.x = parseInt(x);
    this.y = parseInt(y);
    this.width = parseInt(width);
    this.height = parseInt(height);
    this.g = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'g',
    ) as SVGGElement;
    this.g.setAttribute('transform', 'translate(0.5, 0.5)');
    this.vertex = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'rect',
    );
    this.vertex.setAttribute('x', x);
    this.vertex.setAttribute('y', y);
    this.vertex.setAttribute('width', width);
    this.vertex.setAttribute('height', height);
    this.vertex.setAttribute('fill', 'none');
    this.vertex.setAttribute('stroke', 'black');
    this.vertex.setAttribute('stroke-width', '1');
    this.vertex.setAttribute('cursor', 'grab');
    this.vertex.setAttribute('pointer-events', 'bounding-box');

    this.bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    this.bg.setAttribute('x', x);
    this.bg.setAttribute('y', y);
    this.bg.setAttribute('width', width);
    this.bg.setAttribute('height', height);
    this.bg.setAttribute('fill', 'none');
    this.bg.setAttribute('stroke', 'lightblue');
    this.bg.setAttribute('stroke-width', '5');
    this.setSelect(false);

    this.g.appendChild(this.bg);
    this.g.appendChild(this.vertex);

    this.graph.g.appendChild(this.g);

    const vertexMouseMove = (e: MouseEvent) => {
      this.translate(e.offsetX - this.tempX, e.offsetY - this.tempY);
      this.tempX = e.offsetX;
      this.tempY = e.offsetY;
    };
    this.vertex.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      this.setSelect(true);

      this.tempX = e.offsetX;
      this.tempY = e.offsetY;

      document.addEventListener('mousemove', vertexMouseMove);

      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', vertexMouseMove);
        document.body.style.cursor = 'initial';
      });
    });
  }

  addPort(x: number, y: number) {
    let port = new Port(this, x, y);
    this.ports.push(port);
  }

  setSelect(state: boolean) {
    if (state) {
      this.bg.style.opacity = '1';
    } else {
      this.bg.style.opacity = '0';
    }
  }

  translate(x: number, y: number) {
    this.x += x;
    this.y += y;
    this.vertex.setAttribute('x', `${this.x}`);
    this.bg.setAttribute('x', `${this.x}`);
    this.vertex.setAttribute('y', `${this.y}`);
    this.bg.setAttribute('y', `${this.y}`);
    for (let port of this.ports) {
      port.translate(x, y);
    }
  }

  setXY(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.vertex.setAttribute('x', `${this.x}`);
    this.bg.setAttribute('x', `${this.x}`);
    this.vertex.setAttribute('y', `${this.y}`);
    this.bg.setAttribute('y', `${this.y}`);

    // for (let port of this.ports) {
    //   port.translate(diffX, diffY);
    // }
  }
}

export namespace Node {}
