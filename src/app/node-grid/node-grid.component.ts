import { Component, OnInit } from '@angular/core';
import { NodeComponent } from '../node/node.component';

@Component({
  selector: 'app-node-grid',
  templateUrl: './node-grid.component.html',
  styleUrls: ['./node-grid.component.css']
})
export class NodeGridComponent implements OnInit {

  grid: NodeComponent[][];
  height = 25;
  width = 50;

  constructor() {
    this.grid = new Array<Array<NodeComponent>>();
    for (let x = 0; x < this.height; x++) {
      let row:NodeComponent[] = new Array<NodeComponent>();
      for (let y = 0; y < this.width; y++) {
        row.push(new NodeComponent());
      }
      this.grid.push(row);
    }
    this.grid[12][12].id = "start-node";
  }

  ngOnInit(): void {
  }
}
