import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {CartaCredito} from "../../model/cartaCredito";
import {Prodotto} from "../../model/prodotto";
import {CartaCreditoProvider} from "../../providers/carta-credito/carta-credito";
import {LoginProvider} from "../../providers/login/login";
import {ListProductProvider} from "../../providers/list-product/list-product";
import {ListProdottiPage} from "../list-prodotti/list-prodotti";

/**
 * Generated class for the CarrelloPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carrello',
  templateUrl: 'carrello.html',
})
export class CarrelloPage {

  testRadioOpen: boolean;
  testRadioResult;
  prodotto : Prodotto = new Prodotto;
  listaCarrello: Array<Prodotto> = [];
  carte: CartaCredito[] = [];

  totale: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private cartaService : CartaCreditoProvider,
              private utente: LoginProvider,  private prodottiService: ListProductProvider,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarrelloPage');
    this.getCarrello();
    this.listaCarte();
  }
  getCarrello() {
    this.listaCarrello = JSON.parse(localStorage.getItem("carrello"));
    this.calcolaTotale();
  }

  calcolaTotale() {
    this.totale = 0;
    for (let p of this.listaCarrello) {
      this.totale = this.totale += (p.prezzoUnitario * p.quantitaDaAcquistare);
    }
    console.log("totale: "+this.totale);
  }

  aggiungiCarello(prodotto) {
    this.listaCarrello.push(prodotto);
    localStorage.setItem("carrello", JSON.stringify(this.listaCarrello));
    this.calcolaTotale();
  }

  eliminaCarello(prodotto) {
    const i = this.listaCarrello.indexOf(prodotto);
    this.listaCarrello.splice(i, 1);
    console.log('i '+i);
    localStorage.setItem("carrello", JSON.stringify(this.listaCarrello));
    console.log('prodotto eliminato');
    this.calcolaTotale();
  }

  modificaProdotto(prodotto) {
    const i = this.listaCarrello.indexOf(prodotto);
    this.listaCarrello.splice(1, i, prodotto);
    console.log(' prodotto modificato ');
    this.calcolaTotale();
  }

  svuotaCarrello() {
    this.listaCarrello = [];
    localStorage.setItem("carrello", JSON.stringify(this.listaCarrello));
    this.calcolaTotale();
  }

  acquistaProdotti(idCarta) {
    this.prodottiService.acquisti(this.listaCarrello, idCarta);
    this.svuotaCarrello();
    this.navCtrl.push(ListProdottiPage);
  }

  listaCarte() {
    this.cartaService.getAllCard().subscribe(data => {
      this.carte = data;
    });
  }

  eliminaCarta(idCarta) {
    this.cartaService.deleteCard(idCarta);
  }

  saveCarta(carta){
    this.cartaService.saveOrUpdateCard(carta);
  }

  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Scegli la carta');

    for (let c of this.carte) {
      console.log(c);
      alert.addInput({
        type: 'radio',
        label: "Numero Carta: "+c.numero,
        value: c.id.toString(),
        checked: true
      });

    }


    alert.addButton({
      text: 'OK',
      handler: data => {
        console.log(parseInt(data));
        let idCarta = data;
        this.acquistaProdotti(idCarta);
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });
    alert.addButton('Annulla');
    alert.addButton({
      text: 'Nuova carta',
      handler: value => {
        console.log(value);
        this.doPrompt();
      }
    });
    alert.present();
  }

  doPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Inserisci nuova carta',
      message: "Enter a name for this new album you're so keen on adding",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

}
