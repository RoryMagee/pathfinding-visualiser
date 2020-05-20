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

    grid:Node[][];
    height = 25;
    width = 50;
    resetGridSubscription:Subscription;
    runPathfindingSubscription;
    startNode = {
        row: 15,
        column: 12 
    }
    targetNode = {
        row: 35,
        column: 12
    }

    constructor(private nodeDataService: NodeDataService) {
        this.buildGrid();
        this.resetGridSubscription= this.nodeDataService.clickResetGrid().subscribe(() => {
            this.resetGrid();
        });
        this.runPathfindingSubscription = this.nodeDataService.clickPathfinding().subscribe(() => {
            this.findPath();
        });
    }

    buildGrid() {
        this.grid = [];
        for(let i = 0; i < this.height; i++) {
            this.grid[i] = [];
            for(let j = 0; j < this.width; j++) {
                this.grid[i][j] = new Node(j,i);
            }
        }
        console.log(this.grid);
        this.grid[this.startNode.column][this.startNode.row].nodeType = NodeTypes.Start;
        this.grid[this.targetNode.column][this.targetNode.row].nodeType = NodeTypes.Target;
    }

    update(i,j,$event) {
        console.log(this.grid[i][j]);
        if($event.which === 1) {
            if(this.grid[i][j].nodeType === NodeTypes.Default) {
                this.grid[i][j].nodeType =  NodeTypes.Path;
            }
        }
    }
    resetGrid() {
        for(let x = 0; x < this.height; x++) {
            for(let y = 0; y < this.width; y++) {
                this.grid[x][y].nodeType = NodeTypes.Default; 
            }
        }
        this.grid[12][15].nodeType = NodeTypes.Start;
        this.grid[12][35].nodeType = NodeTypes.Target; 
    }

    findPath() {
        findShortestPath(this.startNode, this.targetNode, this.grid);
        alert("finding shortest path");
    }

    ngOnInit(): void {
    }
}
