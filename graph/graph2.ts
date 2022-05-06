import { Node } from '.';
import { Edge } from './edge';
import { Event } from './event';
type GraphOption = {
  autoResize: boolean;
};
export class Graph extends Event {
  nodes: Node[] = [];
  edges: Edge[] = [];
  svg: SVGSVGElement;
  g: SVGGElement;
  translateX: number = 0;
  translateY: number = 0;
  /**
   * x for mousedown
   */
  x: number;
  /**
   * y for mousedown
   */
  y: number;

  constructor(el: HTMLElement, option?: GraphOption) {
    super();
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg = svg;
    this.g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.g.setAttribute(
      'transform',
      `translate(${this.translateX}, ${this.translateY})`,
    );
    this.svg.appendChild(this.g);

    el.appendChild(svg);
    this.svg.addEventListener('mousedown', (e) => {
      for (let node of this.nodes) {
        node.setSelect(false);
      }

      for (let edge of this.edges) {
        edge.setSelect(false);
      }
    });

    const gMouseMove = (e) => {
      let diffX = e.offsetX - this.x;
      let diffY = e.offsetY - this.y;
      this.x = e.offsetX;
      this.y = e.offsetY;

      // this.translateX += diffX;
      // this.translateY += diffY;
      // this.g.setAttribute(
      //   'transform',
      //   `translate(${this.translateX}, ${this.translateY})`,
      // );
      for (let node of this.nodes) {
        node.translate(diffX, diffY);
      }

      for (let edge of this.edges) {
        edge.translate(diffX, diffY);
      }
    };

    this.svg.addEventListener('mousedown', (e) => {
      this.x = e.offsetX;
      this.y = e.offsetY;
      document.addEventListener('mousemove', gMouseMove);
    });

    this.svg.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', gMouseMove);
    });
  }

  addNode(): Node {
    let node = new Node(this, '10', '10', '100', '100');

    this.nodes.push(node);
    return node;
  }

  addEdge() {
    let edge = new Edge(
      this,
      'M 10 100 L 15 100 L 30 85 L 30 120 L 135 120 L 135 100 L 140 100',
    );
    this.edges.push(edge);
  }

  clearSelect() {
    for (let edge of this.edges) {
      edge.setSelect(false);
    }
    for (let node of this.nodes) {
      node.setSelect(false);
    }
  }

  resize(x?: number, y?: number) {
    let width = this.svg.clientWidth;
    let height = this.svg.clientHeight;
    // if (x > width) {
    //   this.svg.setAttribute('width', `${x}`);
    // }
    // if (y > height) {
    //   this.svg.setAttribute('height', `${y}`);
    // }
    for (let edge of this.edges) {
      for (let point of edge.points) {
        if (point.x > width) {
          this.svg.setAttribute('width', `${point.x}`);
        }

        if (point.y > height) {
          this.svg.setAttribute('height', `${point.y}`);
        }
      }
    }
  }
}
