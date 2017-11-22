import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

    this.storage.get('tipos').then((val) => {
      this.types = val;
      console.log('types', this.types);
    });

    if (!_.isNull(this.types)) {
      this.hasTypes = true;
    } else {
      this.hasTypes = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TiposPage');
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
    console.log("borrar Tipo", type);
  }

}
