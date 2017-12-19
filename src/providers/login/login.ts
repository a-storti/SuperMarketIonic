import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BACKEND_URL} from "../../url";

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable()
export class LoginProvider {

  constructor(public http: HttpClient) {
    console.log('Hello LoginProvider Provider');
  }
  login(user) {
    return this.http.post(BACKEND_URL + '/login', user, httpOptions);
  }

  register(user) {
    return this.http.post(BACKEND_URL + '/register', user, httpOptions);
  }

  logout() {
    return this.http.options(BACKEND_URL + '/logoutapp', {responseType: 'text'});
  }

}
