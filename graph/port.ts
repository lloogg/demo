import { Node } from '.';

export class Port {
  // vertex: SVGCircleElement;
  vertex: SVGPathElement;
  x: number;
  y: number;
  constructor(node: Node, x: number, y: number) {
    // this.vertex = document.createElementNS(
    //   'http://www.w3.org/2000/svg',
    //   'circle',
    // );
    this.vertex = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path',
    );
    this.vertex.setAttribute('fill', 'none');
    this.vertex.setAttribute('stroke-width', '1');
    this.vertex.setAttribute('stroke', 'black');

    this.x = x;
    this.y = y;
    this.render();
    // this.vertex.setAttribute('r', '5');
    // this.vertex.setAttribute('pointer-events', 'auto');

    node.g.appendChild(this.vertex);
  }

  translate(x: number, y: number) {
    this.x += x;
    this.y += y;
    this.render();
  }
  setXY(x: number, y: number) {
    // this.vertex.setAttribute('cx', `${x}`);
    // this.vertex.setAttribute('cy', `${y}`);
    this.x = x;
    this.y = y;
    this.render();
  }
  hide() {
    this.vertex.setAttribute('visibility', 'hidden');
  }

  show() {
    this.vertex.setAttribute('visibility', 'show');
  }

  render() {
    let d = '';
    d += `M ${this.x - 6} ${this.y - 3}`;
    d += `L ${this.x} ${this.y}`;
    d += `L ${this.x - 6} ${this.y + 3}`;
    this.vertex.setAttribute('d', d);
  }
}
