import { Node } from './node';
class Graph {
  nodes: Node[] = [];
  addNode(node) {
    this.nodes.push(node);
  }
}
class SystemGraph extends Graph {}
export { Graph, SystemGraph };
