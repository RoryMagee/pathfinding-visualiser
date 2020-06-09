import { isEqual } from 'lodash';
import { NodeTypes } from './node-types.enum';
import { BinaryHeap } from './binary-heap';
export class WeightedGraph {
    adjacencyList;
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if(!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }

    addEdge(v1,v2) {
        if(!this.adjacencyList[v1][v2]) {
            this.adjacencyList[v1].push({node:v2, weight:1});
            this.adjacencyList[v2].push({node:v1, weight:1});
        }
    }
}
