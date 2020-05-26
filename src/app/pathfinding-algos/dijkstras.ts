import { BinaryHeap } from '../binary-heap';
import { WeightedGraph } from '../weighted-graph';
import { Node } from '../node';
import { NodeTypes } from '../node-types.enum';

export async function findShortestPath(startNode, targetNode, grid) {
    let wg = createGraph(grid);
    //let shortestPath = wg.shortestPath(`${startNode.column},${startNode.row}`, `${targetNode.column},${targetNode.row}`);
    let path = await shortestPath(wg,grid,`${startNode.column},${startNode.row}`, `${targetNode.column},${targetNode.row}`)
    for(let x = 0; x < path.length; x++) {
        let arr = path[x].split(',');
        if(grid[arr[0]][arr[1]].nodeType !== NodeTypes.Start && grid[arr[0]][arr[1]].nodeType !== NodeTypes.Target) {
            await sleep(25);
            grid[arr[0]][arr[1]].nodeType = NodeTypes.Visited;
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
        if(grid[arr[0]][arr[1]].nodeType === NodeTypes.Default) {
            await sleep(1);
            grid[arr[0]][arr[1]].nodeType = NodeTypes.Searched;
        } 
        if(smallest === end) { 
            while(previous[smallest]) { 
                path.push(smallest);
                smallest = previous[smallest];
            }
            break;
        }
        if(smallest || distances[smallest] !== Infinity) {
            for(let neighbour in wg.adjacencyList[smallest]) {
                let nextNode = wg.adjacencyList[smallest][neighbour];
                let candidate = distances[smallest] + nextNode.weight;
                if(candidate < distances[nextNode.node]) {
                    distances[nextNode.node] = candidate;
                    previous[nextNode.node] = smallest;
                    nodes.insert(nextNode.node, candidate);
                }
            }
        }
    }
    return path.reverse();
}
