import { Edge } from './edge';
import { Graph } from './graph';
import { Node } from './node';
export * from './edge';
export * from './node';
let graphContainer = document.getElementById('graph');
let graph = new Graph(graphContainer);
let node = graph.addNode();

node.addPort(10, 55);
node.addPort(20, 10);
node.addPort(10, 70);
graph.addEdge();
