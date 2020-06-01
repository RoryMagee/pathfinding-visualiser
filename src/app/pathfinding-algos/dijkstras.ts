import { BinaryHeap } from '../binary-heap';
import { WeightedGraph } from '../weighted-graph';
import { Node } from '../node';
import { NodeTypes } from '../node-types.enum';

export async function findShortestPath(startNode, targetNode, grid) {
    let wg = createGraph(grid);
    let result = await shortestPath(wg,grid,`${startNode.column},${startNode.row}`, `${targetNode.column},${targetNode.row}`)
    let path = result.path;
    let searched = result.searched;
    await animate(grid,searched,4,NodeTypes.Searched);
    await animate(grid,path,25,NodeTypes.Visited);
} 

async function animate(grid,arr: Array<String>,speed: Number,nodeType: NodeTypes) {
    for(let x = 0; x < arr.length; x++) {
        let strSplit = arr[x].split(',');
        if(grid[strSplit[0]][strSplit[1]].nodeType === NodeTypes.Default || grid[strSplit[0]][strSplit[1]].nodeType === NodeTypes.Searched) {
            await sleep(speed);
            grid[strSplit[0]][strSplit[1]].nodeType = nodeType;
        }
    }
}

function createGraph(grid) {
    let wg = new WeightedGraph();
    let gridHeight = grid.length;
    let gridWidth = grid[0].length;
    for(let x = 0; x < gridHeight; x++) {
        for(let y = 0; y < gridWidth; y++) {
            wg.addVertex(`${x},${y}`);
        }
    }

    for(let x = 0; x < gridHeight; x++) {
        for(let y = 0; y < gridWidth; y++) {
            if(x+1 < gridHeight) {
                if(grid[x+1][y]['nodeType'] !== NodeTypes.Path && grid[x][y]['nodeType'] !== NodeTypes.Path) {
                    wg.addEdge(`${x},${y}`, `${x+1},${y}`);
                }
            }
            if(y+1 < gridWidth) {
                if(grid[x][y+1]['nodeType'] !== NodeTypes.Path && grid[x][y]['nodeType'] !== NodeTypes.Path) {
                    wg.addEdge(`${x},${y}`, `${x},${y+1}`);
                }
            }
        }
    }
    return wg;
}

function sleep(ms) {
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
        if(vertex === start) {
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
        let arr = smallest.split(',');
        if(smallest === end) { 
            while(previous[smallest]) { 
                path.push(smallest);
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
        if(grid[arr[0]][arr[1]].nodeType === NodeTypes.Default) {
            searchedNodes.push(`${arr[0]},${arr[1]}`);
        } 
    }
    return {
        path: path.reverse(),
        searched: searchedNodes
    };
}
