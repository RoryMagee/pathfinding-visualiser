import { Component, OnInit } from '@angular/core';
import { NodeComponent } from '../node/node.component';
import { NodeDataService } from '../node-data.service';
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
    startNodeSet: Boolean;
    targetNodeSet: Boolean;

    constructor(private nodeDataService: NodeDataService) {

        this.grid = new Array<Array<Node>>();
        for (let x = 0; x < this.height; x++) {
            let row:Node[] = new Array<Node>();
            for (let y = 0; y < this.width; y++) {
                row.push(new Node(x, y));
            }
            this.grid.push(row);
        }

        this.grid[12][15].nodeType = NodeTypes.Start;
        this.grid[12][35].nodeType  = NodeTypes.Target; 

        console.log(this.grid);
        this.resetGridSubscription= this.nodeDataService.clickResetGrid().subscribe(() => {
            this.resetGrid();
        });
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
        alert("finding path");
    }

    createGraphFromArr() {

    }

    ngOnInit(): void {
    }
}
