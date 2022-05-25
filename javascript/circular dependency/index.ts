import { SystemGraph } from './graph';
import { Node } from './node';

let graph = new SystemGraph();
graph.addNode(new Node());

let node = graph.nodes[0];
console.log(node.getPath());
