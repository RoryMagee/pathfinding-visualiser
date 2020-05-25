import { Component, OnInit } from '@angular/core';
import { NodeGridComponent } from '../node-grid/node-grid.component'; 
import { NodeDataService } from '../node-data.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

    constructor(private nodeDataService:NodeDataService) { } 
    clearGrid() {
        this.nodeDataService.clearGridEvent();
    }

    findPath() {
        this.nodeDataService.runPathfindingEvent();
    }

    ngOnInit(): void {
    }

}
