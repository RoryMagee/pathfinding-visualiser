import { Component, OnInit } from '@angular/core';
import { NodeComponent } from '../node/node.component';
import { NodeDataService } from '../node-data.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-node-grid',
    templateUrl: './node-grid.component.html',
    styleUrls: ['./node-grid.component.css']
})
export class NodeGridComponent implements OnInit {

    grid: NodeComponent[][];
    height = 25;
    width = 50;
    clickEventSubscription:Subscription;

    constructor(private nodeDataService: NodeDataService) {
        this.grid = new Array<Array<NodeComponent>>();
        for (let x = 0; x < this.height; x++) {
            let row:NodeComponent[] = new Array<NodeComponent>();
            for (let y = 0; y < this.width; y++) {
                row.push(new NodeComponent(nodeDataService));
            }
            this.grid.push(row);
        }

        this.clickEventSubscription = this.nodeDataService.getClickEvent().subscribe(() => {
            this.resetGrid();
        });
    }
    
    resetGrid() {
        console.log(this.grid);
    }

    ngOnInit(): void {
    }
}
