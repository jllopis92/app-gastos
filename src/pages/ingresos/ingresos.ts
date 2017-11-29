import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {Storage} from '@ionic/storage'

import * as _ from 'underscore/underscore';

@IonicPage()
@Component({
  selector: 'page-ingresos',
  templateUrl: 'ingresos.html',
})
export class IngresosPage {

  incomes = [];
  incomesToShow = [];
  newIncome: {};
  loading: boolean = true;
  hasIncomes: boolean = false;
  hasDescription: boolean = false;

  date = new Date();

  initDate = new Date().toISOString();
  endDate = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private alertCtrl: AlertController) {

    this.newIncome = {
      name: "",
      rode: 0,
      description: ""
    };
    this.storage.get('incomes').then((val) => {
      this.incomes = val;
      console.log('ingresos', this.incomes);
      this.filterDate();
      this.loading = false;
    });

    this.initDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1).toISOString();
    this.endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1).toISOString();



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GastosPage');
  }

  filterDate() {

    this.incomesToShow = this.incomes;
    //TODO: Falta filtro por fechas
    console.log('post filter', this.incomesToShow);
    if (!_.isNull(this.incomesToShow)) {
      this.hasIncomes = true;
    } else {
      this.hasIncomes = false;
    }
  }

  realFilter() {
    console.log(this.initDate, this.endDate);
    var init = this.initDate;
    var end = this.endDate;
    if (!_.isEmpty(this.incomesToShow)) {
      this.incomesToShow = _.filter(this.incomes, function(exp){
        console.log("date", exp.date.toISOString());
        return ((exp.date.toISOString() >= init) && (exp.date.toISOString() < end));
      });

      console.log("incomesToShow", this.incomesToShow);

      this.getTotal();
    }
  }

  validIncome(income) {
    if((_.isUndefined(income.name)) || (income.name =="")){
      return false;
    }
    if((_.isUndefined(income.rode)) || (income.rode == 0)){
      return false;
    }
    return true;
  }


  saveIncome(newIncome) {
    newIncome.date = new Date();

    if (_.isNull(this.incomes)) {
      this.incomes = [];
    }

    this.incomes.push(newIncome);
    this.storage.set('incomes', this.incomes);

    this.newIncome = {
      name: "",
      rode: 0,
      description: ""
    };
    this.filterDate();
    console.log('new incomes', this.incomes);
  }

  deleteIncome(income) {
    let alert = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: '¿Esta seguro de eliminar el ingreso '+income.name+ '?',
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
            console.log("borrar Ingreso", income);
            var index = _.indexOf(this.incomes, income);
            console.log("index", index);
            if (!_.isUndefined(index)) {
              this.incomes = _.without(this.incomes, income);
              this.storage.set('incomes', this.incomes);
              this.filterDate();
              this.getTotal();
            } else {
              console.log("error, no se encuentra el ingreso");
            }
          }
        }
      ]
    });
    alert.present();
  }

  getTotal() {
    var total = 0;
    if (!_.isEmpty(this.incomesToShow)) {
      for (let i = 0; i < this.incomesToShow.length; i++) {
        total += (this.incomesToShow[i].rode) * 1;
      }
    }
    return total;
  }

}
