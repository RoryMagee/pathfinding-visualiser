import { Component, OnInit, Host, Output, EventEmitter } from '@angular/core';
import { HostListener } from '@angular/core';
import { NodeDataService } from '../node-data.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  visited = false;
  weight = 0;
  id = "default-node"
  startNodeSet: Boolean;
  targetNodeSet: Boolean;

  @Output() startNodeEvent = new EventEmitter<Boolean>();
  @Output() targetNodeEvent = new EventEmitter<Boolean>(); 

  @HostListener('mouseover', ['$event']) drawPath($event) {
    if ($event.which === 1) {
      if (this.id === "default-node") {
        this.id = "path-node";
      } else {
        console.log(`Node has already been assigned as ${this.id}`);
      }
    }
  }

  @HostListener('mouseup', ['$event']) setPoint($event) {
    
    if ($event.which === 2) {
      if (this.id === "start-node") {
        this.id = 'default-node';
        this.data.updateStartNode(false);
      } else if (this.id === 'target-node') {
        this.id = 'default-node';
        this.data.updateTargetNode(false);
      } else if (this.id === 'default-node') {
        if (this.startNodeSet === false) {
          this.id = 'start-node';
          this.data.updateStartNode(true);
        } else if (this.startNodeSet === true && this.targetNodeSet === false) {
          this.id = 'target-node';
          this.data.updateTargetNode(true);
        } else {
          console.log("start and target node already set");
        }
      }
    }
  }

  constructor(private data: NodeDataService) { }

  ngOnInit(): void {
    this.data.startNodeSet.subscribe(status => this.startNodeSet = status);
    this.data.targetNodeSet.subscribe(status => this.targetNodeSet = status);
  }



}
