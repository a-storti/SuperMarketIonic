import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BACKEND_URL} from "../../url";
import {Observable} from "rxjs/Observable";
import {CartaCredito} from "../../model/cartaCredito";

/*
  Generated class for the CartaCreditoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const httpOptions ={
  headers: new HttpHeaders({'Content-Type':'application/json'})
};
@Injectable()
export class CartaCreditoProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CartaCreditoProvider Provider');
  }
  saveOrUpdateCard(cartaCredito) {
    return this.http.post(BACKEND_URL+'/cartaCredito/saveupdate', cartaCredito,httpOptions);
  }

  getAllCard() : Observable<CartaCredito[]> {
    return this.http.get<CartaCredito[]>(BACKEND_URL+'/cartaCredito/getall',httpOptions);
  }

  deleteCard (idCarta){
    return this.http.delete(BACKEND_URL+'/cartaCredito/deletecard/'+idCarta,httpOptions);
  }
}
