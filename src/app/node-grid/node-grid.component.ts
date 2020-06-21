import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Component, OnInit } from '@angular/core';
import { NodeDataService } from '../node-data.service';
import { findShortestPath } from '../pathfinding-algos/dijkstras';
import { Subscription } from 'rxjs';
import { NodeTypes } from '../node-types.enum';
import { createMaze } from '../utils/maze';
import { Node } from '../node.Object';

@Component({
    selector: 'app-node-grid',
    templateUrl: './node-grid.component.html',
    styleUrls: ['./node-grid.component.css']
})

export class NodeGridComponent implements OnInit {

    grid:Node[][];
    height = 25;
    width = 51;
    resetGridSubscription:Subscription;
    runPathfindingSubscription: Subscription;
    createMazeSubscription: Subscription;
    dragAndDrop:Boolean = false;

    startNode:Node = {
        x: 15,
        y: 12 
    }
    targetNode:Node = {
        x: 35,
        y: 12
    }

    constructor(private nodeDataService: NodeDataService) {
    }

    buildGrid() {
        this.grid = [];
        for(let y = 0; y < this.height-1; y++) {
            this.grid[y] = [];
            for(let x = 0; x < this.width-1 ; x++) {
                this.grid[y][x] = {
                    x:x,
                    y:y,
                    nodeType: NodeTypes.Default
                }
            }
        }
        this.grid[this.startNode.y][this.startNode.x]['nodeType'] = NodeTypes.Start;
        this.grid[this.targetNode.y][this.targetNode.x]['nodeType'] = NodeTypes.Target;
    }

    update(x: number,y: number,$event) {
        console.log(x,y);
        if($event.which === 1 && this.grid[x][y]['nodeType'] === NodeTypes.Default && this.dragAndDrop === false) {
            this.grid[x][y]['nodeType'] =  NodeTypes.Path;
        }
    }

    drop(event:CdkDragDrop<string[]>) {
        console.log(event.item.dropContainer.element.nativeElement);
        console.log(event.item.data);
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }

    resetGrid() {
        for(let y = 0; y < this.height-1; y++) {
            for(let x = 0; x < this.width-1; x++) {
                this.grid[y][x]['nodeType'] = NodeTypes.Default; 
            }
        }
        this.targetNode.x = 35;
        this.startNode.x = 15;
        this.grid[12][15].nodeType = NodeTypes.Start;
        this.grid[12][35].nodeType = NodeTypes.Target; 
    }

    findPath() {
        findShortestPath(this.startNode, this.targetNode, this.grid);
    }

    createMaze() {
        createMaze(this.grid, this.startNode, this.targetNode);
    }

    ngOnInit(): void {
        this.buildGrid();
        this.resetGridSubscription= this.nodeDataService.clickResetGrid().subscribe(() => {
            this.resetGrid();
        });
        this.runPathfindingSubscription = this.nodeDataService.clickPathfinding().subscribe(() => {
            this.findPath();
        });
        this.createMazeSubscription = this.nodeDataService.createMaze().subscribe(() => {
            this.createMaze();
        });
    }
}
