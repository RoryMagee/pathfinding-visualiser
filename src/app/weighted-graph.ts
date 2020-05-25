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

    shortestPath(start, finish) {
        const nodes = new BinaryHeap();
        const distances = {};
        const previous = {};
        const path = [];
        let smallest;

        for(let vertex in this.adjacencyList) {
            if(vertex === start) {
                distances[vertex] = 0;
                nodes.insert(vertex, 0);
            } else {
                distances[vertex] = Infinity;
                nodes.insert(vertex, Infinity);
            }
            previous[vertex] = null;
        }
        while(nodes.values.length) {
            smallest = nodes.extractMax();
            if(smallest === finish) {
                while(previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }
            if(smallest || distances[smallest] !== Infinity) {
                for(let neighbour in this.adjacencyList[smallest]) {
                    let nextNode = this.adjacencyList[smallest][neighbour];
                    let candidate = distances[smallest] + nextNode.weight;
                    if(candidate < distances[nextNode.node]) {
                        distances[nextNode.node] = candidate;
                        previous[nextNode.node] = smallest;
                        nodes.insert(nextNode.node, candidate);
                    }
                }
            }
        }
        path.shift();
        return path;
    }
}
