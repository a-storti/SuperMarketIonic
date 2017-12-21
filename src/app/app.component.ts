import { Component, ViewChild } from '@angular/core';
import {Nav, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {ListProdottiPage} from "../pages/list-prodotti/list-prodotti";
import {LoginProvider} from "../providers/login/login";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';

  logged = false;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              public loginService : LoginProvider, public navCtrl : NavController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'login', component: 'LoginPage' },
      { title: 'List', component: 'ListProdottiPage' },
      {title:'Carrello', component:'CarrelloPage'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
    this.loginService.logout().subscribe(data => {
      console.log('logged out.' + data);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.navCtrl.setRoot('LoginPage');
    }, (err) => {
      console.log('logger out. ');
      localStorage.removeItem('user');
      this.logged = false;
    });
  }
}
