import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeDataService {
    private clearGridSubject= new Subject<any>();
    private runPathfindingSubject = new Subject<any>();
    clearGridEvent() {
        console.log(this.clearGridSubject);
        this.clearGridSubject.next();
    }

    clickResetGrid(): Observable<any> {
        return this.clearGridSubject.asObservable();
    }

    runPathfindingEvent() {
        this.runPathfindingSubject.next();
    }

    clickPathfinding(): Observable<any> {
        return this.runPathfindingSubject.asObservable();
    }

   constructor() { }
}
