import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams, Platform} from 'ionic-angular';
import {Prodotto} from "../../model/prodotto";
import {ListProductProvider} from "../../providers/list-product/list-product";

/**
 * Generated class for the ListProdottiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-prodotti',
  templateUrl: 'list-prodotti.html',
})
export class ListProdottiPage {

  loading: Loading;
  listProdotti: Array<Prodotto> = [];
  carrello: Array<Prodotto> = [];
  prodotto: Prodotto = new Prodotto();
  listOfferta: Array<Prodotto> = [];
  listaStorico: Array<Prodotto> = [];
  pushPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private prodottiService:ListProductProvider,
              public platform: Platform,  public loadingCtrl: LoadingController) {
    this.pushPage = 'CarrelloPage'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListProdottiPage');
    this.showLoading();
    this.getall();
  }
  getall() {
    this.prodottiService.getall().subscribe(data => {
      this.listProdotti = data;
      console.log("getall "+ this.listProdotti);
      this.offerteDelGiorno();
      this.loading.dismiss();
    });
  }

  selectProdotto(prodotto: Prodotto) {
    this.prodotto = prodotto;
  }


  getListDisponibili() {
    this.prodottiService.getListDisponibili().subscribe(data => {
      this.listProdotti = data;
    });
  }

  findStorico() {
    this.prodottiService.findStorico().subscribe(data => {
      this.listaStorico = data;
    });
  }

  deleteProdotto(idProdotto) {
    this.prodottiService.deleteProdotto(idProdotto);

  }

  listaDisponibiliCategoria(categoria, disponibili) {
    this.prodottiService.categoriaDisponibili(categoria, disponibili).subscribe(data => {
      this.listProdotti = data;
    });
  }

  aggiungi(prodotto: Prodotto) {
      console.log(prodotto.quantitaDaAcquistare);
      this.prodottiService.modificaProdotto(prodotto);
      console.log(prodotto);
      this.carrello.push(prodotto);
      localStorage.setItem('carrello', JSON.stringify(this.carrello));
      console.log('carrello: ' + localStorage.getItem('carrello').toString());
  }

  offerteDelGiorno() {
    for (var _i = 0; _i < 5; _i++) {
      let casuale: number = Math.round((Math.random() * this.listProdotti.length));
      if (this.listProdotti[casuale].offerta == 1) {
        _i--;
      } else {
        let sconto = this.listProdotti[casuale].prezzoUnitario - (this.listProdotti[casuale].prezzoUnitario * 0.2);
        let decimal: number = Number(parseFloat(sconto.toString()).toFixed(2));
        this.listProdotti[casuale].prezzoUnitario = decimal;
        this.listOfferta.push(this.listProdotti[casuale]);
        this.listProdotti[casuale].offerta = 1;
        console.log(this.listProdotti[casuale].prezzoUnitario);
      }
    }

  }


  doRefresh(refresher) {
    setTimeout(() => {
      this.getall();
      refresher.complete();
    }, 2000);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Caricamento..."
    });
    this.loading.present();
  }
}
