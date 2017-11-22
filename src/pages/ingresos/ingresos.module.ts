import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IngresosPage } from './ingresos';

@NgModule({
  declarations: [
    IngresosPage,
  ],
  imports: [
    IonicPageModule.forChild(IngresosPage),
  ],
})
export class IngresosPageModule {}
