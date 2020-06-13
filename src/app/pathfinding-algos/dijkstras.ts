import { isEqual } from "lodash";
import { BinaryHeap } from '../binary-heap';
import { WeightedGraph } from '../weighted-graph';
import { Node } from '../node.Object';
import { NodeTypes } from '../node-types.enum';

export async function findShortestPath(startNode, targetNode, grid) {
    let wg = createGraph(grid);
    console.log(wg);
    let result = await shortestPath(wg,grid, startNode, targetNode)
    let path = result.path;
    let searched = result.searched;
    await animate(grid,searched,1,NodeTypes.Searched);
    await animate(grid,path,25,NodeTypes.Visited);
} 

export async function animate(grid: Node[][],arr: Node[],speed: Number,nodeType: NodeTypes) {
    for(let x = 0; x < arr.length; x++) {
        if(grid[arr[x].y][arr[x].x].nodeType === NodeTypes.Default || grid[arr[x].y][arr[x].x].nodeType === NodeTypes.Searched) {
            await sleep(speed);
            grid[arr[x].y][arr[x].x].nodeType = nodeType;
        }
    }
}

function createGraph(grid:Node[][]) {
    let wg = new WeightedGraph();
    let gridHeight = grid.length;
    let gridWidth = grid[0].length;
    for(let y = 0; y < gridHeight; y++) {
        for(let x = 0; x < gridWidth; x++) {
            wg.addVertex(JSON.stringify({x:x, y:y}));
        }
    }
    for(let y = 0; y < gridHeight; y++) {
        for(let x = 0; x < gridWidth; x++) {
            if(y+1 < gridHeight) {
                if(grid[y+1][x].nodeType !== NodeTypes.Path && grid[y][x].nodeType !== NodeTypes.Path) {
                    wg.addEdge(JSON.stringify({x:x,y:y}), JSON.stringify({x:x, y:y+1}));
                }
            }
            if(x+1 < gridWidth) {
                if(grid[y][x+1]['nodeType'] !== NodeTypes.Path && grid[y][x]['nodeType'] !== NodeTypes.Path) {
                    wg.addEdge(JSON.stringify({x:x,y:y}), JSON.stringify({x:x+1, y:y}));
                }
            }
        }
    }
    return wg;
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function shortestPath(wg,grid,start,end) {
    const nodes = new BinaryHeap();
    const distances = {};
    const previous = {};
    const path = [];
    let smallest;
    let searchedNodes = [];

    for(let vertex in wg.adjacencyList) {
        if(isEqual(JSON.parse(vertex), start)) {
            distances[vertex] = 0;
            nodes.insert(vertex,0);
        } else {
            distances[vertex] = Infinity;
            nodes.insert(vertex, Infinity);
        }
        previous[vertex] = null;
    }
    while(nodes.values.length) {
        smallest = nodes.extractMax();
        if(isEqual(JSON.parse(smallest), end)) {
            while(previous[smallest]) { 
                path.push(JSON.parse(smallest));
                smallest = previous[smallest];
            }
            break;
        }
        if(smallest && distances[smallest] !== Infinity) {
            for(let neighbour in wg.adjacencyList[smallest]) {
                let nextNode = wg.adjacencyList[smallest][neighbour];
                let candidate = distances[smallest] + nextNode.weight;
                if(candidate < distances[nextNode.node]) {
                    distances[nextNode.node] = candidate;
                    previous[nextNode.node] = smallest;
                    nodes.insert(nextNode.node, candidate);
                }
            }
        } else {
            break;
        }
        smallest = JSON.parse(smallest);
        if(grid[smallest.y][smallest.x]?.nodeType === NodeTypes.Default) {
            searchedNodes.push(smallest);
        } 
    }
    return {
        path: path.reverse(),
        searched: searchedNodes
    };
}
