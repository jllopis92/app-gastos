import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import * as _ from 'underscore/underscore';

/**
 * Generated class for the TiposPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tipos',
  templateUrl: 'tipos.html',
})
export class TiposPage {

  types = [];
  newType: {};

  loading: boolean = true;
  hasTypes: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private alertCtrl: AlertController) {

    this.newType = {
      name: ""
    };
    this.storage.get('types').then((val) => {
      this.types = val;
      console.log('types', this.types);
    });

    this.checkTypes();
  }

  checkTypes() {
    if (!_.isNull(this.types)) {
      this.hasTypes = true;
    } else {
      this.hasTypes = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TiposPage');
  }

  validType(type) {
    if((_.isUndefined(type.name)) || (type.name =="")){
      return false;
    }

    return true;
  }

  saveType(newType) {
    if (_.isNull(this.types)) {
      this.types = [];
    }
    this.types.push(newType);
    this.storage.set('types', this.types);

    this.newType = {
      name: ""
    };

  }

  deleteType(type) {
    let alert = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: '¿Esta seguro de eliminar el tipo '+type.name+ '?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log("borrar Tipo", type);
            var index = _.indexOf(this.types, type);
            console.log("index", index);
            if (!_.isUndefined(index)) {
              this.types = _.without(this.types, type);
              this.storage.set('types', this.types);
            } else {
              console.log("error, no se encuentra el gasto");
            }
          }
        }
      ]
    });
    alert.present();



  }
}
