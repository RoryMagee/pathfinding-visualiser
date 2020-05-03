import { Component, OnInit } from '@angular/core';
import { NodeComponent } from '../node/node.component';
import { NodeDataService } from '../node-data.service';

@Component({
  selector: 'app-node-grid',
  templateUrl: './node-grid.component.html',
  styleUrls: ['./node-grid.component.css']
})
export class NodeGridComponent implements OnInit {

  grid: NodeComponent[][];
  height = 25;
  width = 50;

  constructor(private data: NodeDataService) {
    this.grid = new Array<Array<NodeComponent>>();
    for (let x = 0; x < this.height; x++) {
      let row:NodeComponent[] = new Array<NodeComponent>();
      for (let y = 0; y < this.width; y++) {
        row.push(new NodeComponent(data));
      }
      this.grid.push(row);
    }
  }

  resetGrid() {
    this.grid.forEach(row => {
      row.forEach(item => {
        item.id = "default-node";
      })
    });
  }

  

  ngOnInit(): void {
      console.log("NODE GRID INITIALIZED");
  }
}
