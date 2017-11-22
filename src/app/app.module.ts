import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {IonicStorageModule} from '@ionic/storage';
import { MyApp } from './app.component';

import { GastosPage } from '../pages/gastos/gastos';
import { IngresosPage } from '../pages/ingresos/ingresos';
import { TiposPage } from '../pages/tipos/tipos';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    GastosPage,
    IngresosPage,
    TiposPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GastosPage,
    IngresosPage,
    TiposPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
