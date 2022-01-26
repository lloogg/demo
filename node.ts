namespace Graph {
  export class Node {
    x: number;
    y: number;
    width: number;
    height: number;
    node: SVGRectElement;
    g: SVGGElement = null;
    svg: SVGSVGElement = document.getElementsByTagName('svg')[0];
    port: SVGCircleElement;
    constructor(x: string, y: string, width: string, height: string) {
      this.x = parseInt(x);
      this.y = parseInt(y);
      this.width = parseInt(width);
      this.height = parseInt(height);
      this.g = document.createElementNS(xmlns, 'g') as SVGGElement;
      this.g.setAttribute('transform', 'translate(0.5, 0.5)');
      this.node = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'rect',
      );
      this.node.setAttribute('x', x);
      this.node.setAttribute('y', y);
      this.node.setAttribute('width', width);
      this.node.setAttribute('height', height);
      this.node.setAttribute('fill', 'none');
      this.node.setAttribute('stroke', 'black');
      this.node.setAttribute('stroke-width', '1');
      this.node.setAttribute('cursor', 'grab');
      this.node.setAttribute('pointer-events', 'bounding-box');
      this.g.appendChild(this.node);
      this.svg.appendChild(this.g);

      document.addEventListener('mouseup', () => {
        // document.removeEventListener('mousemove', this.dragPath.apply(this));
        document.onmousemove = null;
        document.body.style.cursor = 'initial';
      });
      this.node.addEventListener('mousedown', (e) => {
        let x = e.offsetX;
        let y = e.offsetY;
        document.onmousemove = (e) => {
          this.x += e.offsetX - x;
          this.y += e.offsetY - y;

          this.node.setAttribute('x', `${this.x}`);
          this.node.setAttribute('y', `${this.y}`);

          if (this.port) {
            let cx = parseInt(this.port.getAttribute('cx'));
            let cy = parseInt(this.port.getAttribute('cy'));
            cx += e.offsetX - x;
            cy += e.offsetY - y;
            this.port.setAttribute('cx', `${cx}`);
            this.port.setAttribute('cy', `${cy}`);
          }

          x = e.offsetX;
          y = e.offsetY;
        };
      });
    }

    addPort(x: string, y: string) {
      let port: SVGCircleElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle',
      );
      port.setAttribute('r', '5');
      port.setAttribute('cx', x);
      port.setAttribute('cy', y);
      this.port = port;
      this.g.appendChild(port);
    }
  }
}

let node = new Graph.Node('10', '10', '100', '100');
node.addPort('10', '55');
