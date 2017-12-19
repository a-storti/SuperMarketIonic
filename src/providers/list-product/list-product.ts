import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Prodotto} from "../../model/prodotto";
import {Observable} from "rxjs/Observable";
import {BACKEND_URL} from "../../url";

/*
  Generated class for the ListProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class ListProductProvider {
  carrello: Prodotto[] = [];
  constructor(public http: HttpClient) {
    console.log('Hello ListProductProvider Provider');
  }

  getall(): Observable<Prodotto[]> {
    return this.http.get<Prodotto[]>(BACKEND_URL + '/prodotto/getlist', httpOptions);
  }

  acquisti(prodotto, carta) {
    return this.http.post(BACKEND_URL + '/acquista/' + carta, prodotto, httpOptions);
  }

  findProdottoById(prodottoId): Observable<Prodotto> {
    return this.http.get<Prodotto>(BACKEND_URL + '/findById/' + prodottoId, httpOptions);
  }

  getListDisponibili(): Observable<Prodotto[]> {
    return this.http.get<Prodotto[]>(BACKEND_URL + '/getListDisponibili', httpOptions);
  }

  getCategoria(categoria): Observable<Prodotto[]> {
    return this.http.get<Prodotto[]>(BACKEND_URL + '/getByCategoria/' + categoria, httpOptions);
  }

  findStorico(): Observable<Prodotto[]> {
    return this.http.get<Prodotto[]>(BACKEND_URL + '/getStorico', httpOptions);
  }

  categoriaDisponibili(categoria, disponibili): Observable<Prodotto[]> {
    return this.http.get<Prodotto[]>(BACKEND_URL + '/getByCategoria/' + categoria + '/' + disponibili, httpOptions);
  }

  /**Cancellazione del prodotto identificato dall'id
   *
   * @param idProdotto
   * @returns {Observable<Object>}
   */
  deleteProdotto(idProdotto) {
    return this.http.delete(BACKEND_URL + '/delete/' + idProdotto, httpOptions);
  }

  /*******************************************/
  /**Metodi per il carrello
   *
   */
  leggiCarrello() {
    this.carrello = JSON.parse(localStorage.getItem('carrello'));
  }

  aggiungiCarello(prodotto) {
    this.carrello.push(prodotto);
    localStorage.setItem('carrello', JSON.stringify(this.carrello));
  }

  eliminaCarello(prodotto) {
    const i = this.carrello.indexOf(prodotto);
    this.carrello.splice(1, i);
    localStorage.setItem('carrello', JSON.stringify(this.carrello));
    console.log('prodotto eliminato');
  }

  modificaProdotto(prodotto) {
    return this.http.post(BACKEND_URL + "/saveOrUpdate", httpOptions);
  }

  svuotaCarrello() {
    this.carrello = [];
    localStorage.removeItem('carrello');
  }
}
