import { sleep } from '../pathfinding-algos/dijkstras';
import { Node } from '../node.Object';
import { NodeTypes } from '../node-types.enum';

export function createMaze(grid: Node[][], startNode: Node, targetNode: Node) {
    setupGrid(grid,startNode,targetNode);
    let stack = [];
    recursiveBacktrack(startNode, stack, grid);
    console.log('bt done');
}

async function recursiveBacktrack(currentNode:Node, stack:Node[], grid: Node[][]) {
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
            await sleep(24);
            travel(currentNode,nextNode, grid);
            //nextNode.nodeType = NodeTypes.Default;
        }
        recursiveBacktrack(nextNode, stack, grid);
    }
}

function travel(currentNode:Node, nextNode:Node, grid:Node[][]) {
    //currentNode.nodeType = NodeTypes.Default;
    nextNode.nodeType = NodeTypes.Default;
    let y = currentNode.y;
    let x = currentNode.x;
    if(x !== nextNode.x) {
        x = Math.min(x,nextNode.x) + 1;
    } else {
        y = Math.min(y,nextNode.y) + 1;
    }
    grid[y][x].nodeType = NodeTypes.Default;
}

//Helper functions
function setupGrid(grid:Node[][], startNode:Node, targetNode:Node) {
    for(let y = 0; y < grid.length; y++) {
        for(let x = 0; x < grid[y].length; x++) {
            grid[y][x].nodeType = NodeTypes.Path;
        }
    }
    startNode.x = 0;
    targetNode.x = 48
    grid[grid.length/2][0]['nodeType'] = NodeTypes.Start;
    grid[grid.length/2][grid[0].length-1]['nodeType'] = NodeTypes.Target;
}

function getValidMoves(grid:Node[][], currentNode:Node) {
    let res:Node[] = []
    let validNodes = [NodeTypes.Path, NodeTypes.Target];
    //check right
    let {x,y} = currentNode;
    if(x+2 < grid[0].length && validNodes.indexOf(grid[y][x+2]?.nodeType) != -1 &&
        validNodes.indexOf(grid[y+1][x+1]?.nodeType) != -1 &&
        validNodes.indexOf(grid[y-1][x+1]?.nodeType) != -1) {
        res.push(grid[y][x+2]);
    }
    //check left
    if(x-2 < grid[0].length && validNodes.indexOf(grid[y][x-2]?.nodeType) != -1 &&
        validNodes.indexOf(grid[y+1][x-1]?.nodeType) != -1 &&
        validNodes.indexOf(grid[y-1][x-1]?.nodeType) != -1) {
        res.push(grid[y][x-2]);
    }
    //check above
    if(y-2 >= 1 && validNodes.indexOf(grid[y-2][x]?.nodeType) != -1 &&
        validNodes.indexOf(grid[y-1][x+1]?.nodeType) != -1 &&
        validNodes.indexOf(grid[y-1][x-1]?.nodeType) != -1) {
        res.push(grid[y-2][x]);
    }
    //check below
    if(y+2 < grid.length && validNodes.indexOf(grid[y+2][x]?.nodeType) != -1 &&
        validNodes.indexOf(grid[y+1][x+1]?.nodeType) != -1 &&
        validNodes.indexOf(grid[y+1][x-1]?.nodeType) != -1) {
        res.push(grid[y+2][x]);
    }
    return res;
}
