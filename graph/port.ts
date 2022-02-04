import { Node } from '.';

export class Port {
  vertex: SVGCircleElement;
  x: number;
  y: number;
  constructor(node: Node, x: number, y: number) {
    this.vertex = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle',
    );
    this.x = x;
    this.y = y;
    this.vertex.setAttribute('r', '5');
    this.vertex.setAttribute('pointer-events', 'auto');

    this.setXY(this.x, this.y);
    node.g.appendChild(this.vertex);
  }

  translate(x: number, y: number) {
    this.x += x;
    this.y += y;
    this.vertex.setAttribute('cx', `${this.x}`);
    this.vertex.setAttribute('cy', `${this.y}`);
  }
  setXY(x: number, y: number) {
    this.vertex.setAttribute('cx', `${x}`);
    this.vertex.setAttribute('cy', `${y}`);
  }
  hide() {
    this.vertex.setAttribute('visibility', 'hidden');
  }
}
