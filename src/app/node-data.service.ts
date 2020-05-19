import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeDataService {
    private subject = new Subject<any>();
    sendClickEvent() {
        console.log(this.subject);
        this.subject.next();
    }

    clickResetGrid(): Observable<any> {
        return this.subject.asObservable();
    }

    findPath() {
        console.log("service: finding path");
    }

   constructor() { }
}
