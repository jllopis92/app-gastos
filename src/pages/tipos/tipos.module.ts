import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TiposPage } from './tipos';

@NgModule({
  declarations: [
    TiposPage,
  ],
  imports: [
    IonicPageModule.forChild(TiposPage),
  ],
})
export class TiposPageModule {}
