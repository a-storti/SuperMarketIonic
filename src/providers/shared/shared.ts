import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

/*
  Generated class for the SharedProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SharedProvider {
  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();

  constructor(public http: HttpClient) {
    console.log('Hello SharedProvider Provider');
  }
  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }
}
