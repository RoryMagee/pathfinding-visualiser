import { Component, OnInit } from '@angular/core';
import { NodeComponent } from '../node/node.component';
import { NodeDataService } from '../node-data.service';
import { findShortestPath } from '../pathfinding-algos/dijkstras';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-node-grid',
    templateUrl: './node-grid.component.html',
    styleUrls: ['./node-grid.component.css']
})
export class NodeGridComponent implements OnInit {

    grid:String[][];
    height = 25;
    width = 50;
    resetGridSubscription:Subscription;
    runPathfindingSubscription;
    startNodeSet: Boolean;
    targetNodeSet: Boolean;

    constructor(private nodeDataService: NodeDataService) {

        this.grid = new Array<Array<String>>();
        for (let x = 0; x < this.height; x++) {
            let row:String[] = new Array<String>();
            for (let y = 0; y < this.width; y++) {
                row.push('default-node');
            }
            this.grid.push(row);
        }

        this.grid[12][15] = "start-node";
        this.grid[12][35] = "target-node";

        this.resetGridSubscription= this.nodeDataService.clickResetGrid().subscribe(() => {
            this.resetGrid();
        });
        this.runPathfindingSubscription = this.nodeDataService.clickPathfinding().subscribe(() => {
            this.findPath();
        });
    }

    update(i,j,$event) {
        if($event.which === 1) {
            if(this.grid[i][j] === 'default-node') {
                this.grid[i][j] = 'path-node'
            }
        }
    }
    
    resetGrid() {
        for(let x = 0; x < this.height; x++) {
            for(let y = 0; y < this.width; y++) {
                this.grid[x][y] = "default-node";
            }
        }
        this.grid[12][15] = "start-node";
        this.grid[12][35] = "target-node";
    }

    findPath() {
        findShortestPath();        
    }

    createGraphFromArr() {

    }

    ngOnInit(): void {
    }
}
