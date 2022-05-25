import { Graph, SystemGraph } from './graph';

class Node {
  model: any = {};
  getPath() {
    return this.model.graph instanceof SystemGraph;
  }
}

export { Node };
