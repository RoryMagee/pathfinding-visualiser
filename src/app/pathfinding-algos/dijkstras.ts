import { BinaryHeap } from '../binary-heap';
import { WeightedGraph } from '../weighted-graph';
import { Node } from '../node';
import { NodeTypes } from '../node-types.enum';

export function findShortestPath(startNode, targetNode, grid) {
    let wg = createGraph(grid);
    const nodes = new BinaryHeap();
    const distances = {};
    const previous = {};
    let path = [];
    let smallest;
    console.log(wg); 
    let shortestPath = wg.shortestPath(`${startNode.column},${startNode.row}`, `${targetNode.column},${targetNode.row}`);
    for(let x = 0; x < shortestPath.length; x++) {
        let arr = shortestPath[x].split(',');
        grid[arr[0]][arr[1]].nodeType = NodeTypes.Visited;
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
            //if(x+1 < gridHeight && grid[x+1][y]['nodeType'] === NodeTypes.Default) {
                if(grid[x+1][y]['nodeType'] !== NodeTypes.Path) {
                    wg.addEdge(`${x},${y}`, `${x+1},${y}`);
                }
            }
            if(y+1 < gridWidth) {
            //if(y+1 < gridWidth && grid[x][y+1]['nodeType'] === NodeTypes.Default) {
                if(grid[x][y+1]['nodeType'] !== NodeTypes.Path) {
                    wg.addEdge(`${x},${y}`, `${x},${y+1}`);
                }
            }
        }
    }
    return wg;
}
