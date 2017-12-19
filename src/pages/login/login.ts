import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginProvider} from "../../providers/login/login";
import {SharedProvider} from "../../providers/shared/shared";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {username: '', password: '', profileType: 'ROLE_ADMIN'};
  pushPage: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService:LoginProvider,
  private sharedService:SharedProvider,) {
    this.pushPage = 'RegisterPage';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login() {
    this.loginService.login(this.user).subscribe(data => {
      console.log(data);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', btoa(this.user.username + ':' + this.user.password));
      this.sharedService.emitChange('logged=true');
      this.navCtrl.push('ListProdottiPage', {replaceUrl: true});
    }, err => {
      console.log(err);
    });
  }
}
