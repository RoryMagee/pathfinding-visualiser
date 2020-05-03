import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeDataService {
  private startNodeSetSource = new BehaviorSubject(false);
  startNodeSet = this.startNodeSetSource.asObservable();
  
  private targetNodeSetSource = new BehaviorSubject(false);
  targetNodeSet = this.targetNodeSetSource.asObservable();

  constructor() { }

  updateStartNode(update) {
    this.startNodeSetSource.next(update);
  }
  updateTargetNode(update) {
    this.targetNodeSetSource.next(update);
  }
}
