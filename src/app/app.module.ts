import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CartaCreditoProvider } from '../providers/carta-credito/carta-credito';
import { InterceptorProvider } from '../providers/interceptor/interceptor';
import { LoginProvider } from '../providers/login/login';
import { ListProductProvider } from '../providers/list-product/list-product';
import { SharedProvider } from '../providers/shared/shared';
import {HttpClientModule, } from "@angular/common/http";

@NgModule({
  declarations: [
    MyApp,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CartaCreditoProvider,
    InterceptorProvider,
    LoginProvider,
    ListProductProvider,
    SharedProvider
  ]
})
export class AppModule {}
