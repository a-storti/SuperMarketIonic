import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginProvider} from "../../providers/login/login";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  private user = {
    username: '', password: '', profileType: 'ROLE_ADMIN', tel: '',
    via: '', cap: '', citta: '', prov: ''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService:LoginProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  register() {
    this.loginService.register(this.user).subscribe(data => {
      console.log(data);
      this.navCtrl.setRoot('LoginPage');
    }, err => {
      console.log(err);
    })
  }
}
