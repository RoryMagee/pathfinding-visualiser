import { Component, OnInit, Host } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  visited = false;
  weight = 0;
  id = "default-node"
  startNodeSet: Boolean = false;
  targetNodeSet: Boolean = false;

  @HostListener('dragover') drawPath() {
    this.id = "path-node";
  }
  @HostListener('mouseup', ['$event']) setPoint(event) {
    
  }

  constructor() { }

  ngOnInit(): void {

  }



}
