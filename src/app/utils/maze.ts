import { Node } from '../node.Object';
import { NodeTypes } from '../node-types.enum';
import { animate } from '../pathfinding-algos/dijkstras'; 

export function createMaze(grid: Node[][], startNode: Node, targetNode: Node) {
    setupGrid(grid,startNode,targetNode);
    let stack = [];
    recursiveBacktrack(startNode, stack, grid);
}

function recursiveBacktrack(currentNode, stack, grid) {
    let validMoves = getValidMoves(grid, currentNode); 
    if(validMoves.length == 0) {
        if(stack.length == 0) {
            return;
        } else {
            recursiveBacktrack(stack.pop(), stack, grid);
        }
    } else {
        let nextNode = validMoves[Math.floor(Math.random() * validMoves.length)];
        stack.push(nextNode);
        if(nextNode.nodeType === NodeTypes.Path) {
            nextNode.nodeType = NodeTypes.Default;
        }
        recursiveBacktrack(nextNode, stack, grid);
    }
}

//function recursiveBacktrack(currentNode, stack, grid) {
//    let validMoves = getValidMoves(grid, JSON.parse(currentNode));
//    if (validMoves.length == 0) {
//    } else {
//        let nextNode = validMoves[Math.floor(Math.random() * validMoves.length)];
//        stack.push(JSON.stringify(nextNode));
//        if(nextNode.nodeType === NodeTypes.Path) {
//            nextNode.nodeType = NodeTypes.Default;
//        }
//    }
//}

//Helper functions
function setupGrid(grid:Node[][], startNode:Node, targetNode:Node) {
    for(let y = 0; y < grid.length; y++) {
        for(let x = 0; x < grid[y].length; x++) {
            grid[y][x].nodeType = NodeTypes.Path;
        }
    }
    startNode['x'] = 0;
    targetNode['x'] = 48
    grid[grid.length/2][0]['nodeType'] = NodeTypes.Start;
    grid[grid.length/2][grid[0].length-1]['nodeType'] = NodeTypes.Target;
}

function getValidMoves(grid:Node[][], currentNode:Node) {
    let res:Node[] = []
    //check right
    if(currentNode.x+2 < grid[0].length && grid[currentNode?.y][currentNode?.x+2]?.nodeType === NodeTypes.Path &&
        grid[currentNode?.y+1][currentNode?.x+1]?.nodeType === NodeTypes.Path &&
        grid[currentNode?.y-1][currentNode?.x+1]?.nodeType === NodeTypes.Path) {
        res.push(grid[currentNode.y][currentNode.x+1]);
    }
    //check left
    if(currentNode.x-2 < grid[0].length && grid[currentNode?.y][currentNode?.x-2]?.nodeType === NodeTypes.Path &&
        grid[currentNode?.y+1][currentNode?.x-1]?.nodeType === NodeTypes.Path &&
        grid[currentNode?.y-1][currentNode?.x-1]?.nodeType === NodeTypes.Path) {
        res.push(grid[currentNode.y][currentNode.x-1]);
    }
    //check above
    if(currentNode.y-2 >= 0 && grid[currentNode?.y-2][currentNode?.x]?.nodeType === NodeTypes.Path &&
        grid[currentNode?.y-1][currentNode?.x+1]?.nodeType === NodeTypes.Path &&
        grid[currentNode?.y-1][currentNode?.x-1]?.nodeType === NodeTypes.Path) {
        res.push(grid[currentNode.y-1][currentNode.x]);
    }
    //check below
    if(currentNode.y+2 < grid.length && grid[currentNode?.y+2][currentNode?.x]?.nodeType === NodeTypes.Path &&
        grid[currentNode?.y+1][currentNode?.x+1]?.nodeType === NodeTypes.Path &&
        grid[currentNode?.y+1][currentNode?.x-1]?.nodeType === NodeTypes.Path) {
        res.push(grid[currentNode.y+1][currentNode.x]);
    }
    return res;
}
