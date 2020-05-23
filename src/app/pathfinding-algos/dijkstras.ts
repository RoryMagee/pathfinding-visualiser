import { BinaryHeap } from '../binary-heap';
import { WeightedGraph } from '../weighted-graph';
import { Node } from '../node';
import { NodeTypes } from '../node-types.enum';
//Steps:
//                                                                              

export function findShortestPath(startNode, targetNode, grid) {
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
            //Above Node
            console.log('adding above');
            if(x-1 >= 0) {
                wg.addEdge(`${x},${y}`, `${x-1},${y}`);
            }
            //Below Node
            console.log('adding below');
            if(x+1 < gridHeight) {
                console.log(x,y);
                wg.addEdge(`${x},${y}`, `${x+1},${y}`);
            }
            //Left
            console.log('adding left');
            if(y-1 >= 0) {
                wg.addEdge(`${x},${y}`, `${x},${y-1}`);
            }
            //
            //Right
            console.log('adding right');
            if(y+1 < gridWidth) {
                wg.addEdge(`${x},${y}`, `${x},${y+1}`);
            }
        }
    }
}
