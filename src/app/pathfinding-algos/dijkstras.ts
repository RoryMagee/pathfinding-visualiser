import { BinaryHeap } from '../binary-heap';
import { WeightedGraph } from '../weighted-graph';
import { Node } from '../node';
import { NodeTypes } from '../node-types.enum';
//Steps:
//                                                                              

export function findShortestPath(startNode, targetNode, grid) {
   let date1 = new Date();
    createGraph(grid);
}

function createGraph(grid) {
    let wg = new WeightedGraph();
    let gridHeight = grid.length;
    let gridWidth = grid[0].length;
    console.log(gridHeight, gridWidth);
    for(let x = 0; x < gridHeight; x++) {
        for(let y = 0; y < gridWidth; y++) {
            wg.addVertex(`${x},${y}`); 
        }
    }

    for(let x = 0; x < gridHeight; x++) {
        for(let y = 0; y < gridWidth; y++) {
            if(x+1 < gridHeight) {
                console.log(x,y);
                wg.addEdge(`${x},${y}`, `${x+1},${y}`);
            }
            if(y+1 < gridWidth) {
                wg.addEdge(`${x},${y}`, `${x},${y+1}`);
            }
        }
    }
    console.log(wg);
}
