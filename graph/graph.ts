import { Edge, Node } from '.';
export class Graph {
  port: any;
  constructor() {}

  addNode() {
    let node = new Node('10', '10', '100', '100');
    node.addPort('10', '55');
    this.port = { x: 10, y: 55 };
  }

  addEdge() {
    let edge = new Edge(
      'M 10 100 L 15 100 L 15 120 L 135 120 L 135 100 L 140 100',
    );
    edge.graph = this;
  }
}
