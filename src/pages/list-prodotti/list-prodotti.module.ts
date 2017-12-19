import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListProdottiPage } from './list-prodotti';

@NgModule({
  declarations: [
    ListProdottiPage,
  ],
  imports: [
    IonicPageModule.forChild(ListProdottiPage),
  ],
})
export class ListProdottiPageModule {}
