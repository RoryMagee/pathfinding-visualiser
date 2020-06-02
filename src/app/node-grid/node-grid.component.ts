import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Component, OnInit } from '@angular/core';
import { NodeDataService } from '../node-data.service';
import { findShortestPath } from '../pathfinding-algos/dijkstras';
import { Subscription } from 'rxjs';
import { Node } from '../node';
import { NodeTypes } from '../node-types.enum';

@Component({
    selector: 'app-node-grid',
    templateUrl: './node-grid.component.html',
    styleUrls: ['./node-grid.component.css']
})

export class NodeGridComponent implements OnInit {

    grid:Object[][];
    height = 25;
    width = 50;
    resetGridSubscription:Subscription;
    runPathfindingSubscription;
    createMazeSubscription;

    startNode = {
        row: 15,
        column: 12 
    }
    targetNode = {
        row: 35,
        column: 12
    }

    constructor(private nodeDataService: NodeDataService) {
    }

    buildGrid() {
        this.grid = [];
        for(let x = 0; x < this.height; x++) {
            this.grid[x] = [];
            for(let y = 0; y < this.width ; y++) {
                this.grid[x][y] = {
                    x:x,
                    y:y,
                    nodeType: NodeTypes.Default
                }
            }
        }
        this.grid[this.startNode.column][this.startNode.row]['nodeType'] = NodeTypes.Start;
        this.grid[this.targetNode.column][this.targetNode.row]['nodeType'] = NodeTypes.Target;
    }

    update(x,y,$event) {
        if($event.which === 1 && this.grid[x][y]['nodeType'] === NodeTypes.Default) {
            this.grid[x][y]['nodeType'] =  NodeTypes.Path;
        }
    }

    drop(event:CdkDragDrop<string[]>) {
        console.log(event);
        if(event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            console.log("item moved");
        }
    }

    resetGrid() {
        for(let x = 0; x < this.height; x++) {
            for(let y = 0; y < this.width; y++) {
                this.grid[x][y]['nodeType'] = NodeTypes.Default; 
            }
        }
        this.grid[12][15]['nodeType'] = NodeTypes.Start;
        this.grid[12][35]['nodeType'] = NodeTypes.Target; 
    }

    findPath() {
        findShortestPath(this.startNode, this.targetNode, this.grid);
    }

    createMaze() {
        console.log('creating maze');
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
