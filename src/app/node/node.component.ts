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
    nodeType = "default-node"
    startNodeSet: Boolean;
    targetNodeSet: Boolean;

    @Output() startNodeEvent = new EventEmitter<Boolean>();
    @Output() targetNodeEvent = new EventEmitter<Boolean>(); 

    @HostListener('mouseover', ['$event']) drawPath($event) {
        if ($event.which === 1) {
            if (this.nodeType=== "default-node") {
                this.nodeType= "path-node";
            }
        }
    }

    //@HostListener('mouseup', ['$event']) setPoint($event) {
    //    if ($event.which === 2) {
    //        if (this.nodeType === "start-node") {
    //            this.nodeType = 'default-node';
    //            this.data.updateStartNode(false);
    //        } else if (this.nodeType === 'target-node') {
    //            this.nodeType = 'default-node';
    //            this.data.updateTargetNode(false);
    //        } else if (this.nodeType === 'default-node') {
    //            if (this.startNodeSet === false) {
    //                this.nodeType = 'start-node';
    //                this.data.updateStartNode(true);
    //            } else if (this.startNodeSet === true && this.targetNodeSet === false) {
    //                this.nodeType = 'target-node';
    //                this.data.updateTargetNode(true);
    //            } else {
    //                console.log("start and target node already set");
    //            }
    //        }
    //    }
    //    console.log(this);
    //}

    constructor(private data: NodeDataService) {
    }

    ngOnInit(): void{
    }



}
