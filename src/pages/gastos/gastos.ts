import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';

import * as _ from 'underscore/underscore';

/**
 * Generated class for the GastosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gastos',
  templateUrl: 'gastos.html',
})
export class GastosPage {

  expenses = [];
  types = [];
  expensesToShow = [];
  newExpense: {};
  loading: boolean = true;
  hasExpenses: boolean = false;
  hasDescription: boolean = false;

  /*initDate: String = new Date().toISOString();
  endDate: String = new Date().toISOString();*/

  date = new Date();

  initDate = new Date().toISOString();
  endDate = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

    this.newExpense = {
      type: "",
      name: "",
      rode: 0,
      description: ""
    };
    this.storage.get('gastos').then((val) => {
      this.expenses = val;
      console.log('gastos', this.expenses);
      this.filterDate();
      this.loading = false;
    });

    this.storage.get('types').then((val) => {
      this.types = val;
      console.log('types', this.types);
    });

    this.initDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1).toISOString();
    this.endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1).toISOString();



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GastosPage');
  }

  filterDate() {

    this.expensesToShow = this.expenses;
    //TODO: Falta filtro por fechas
    console.log('post filter', this.expensesToShow);
    if (!_.isNull(this.expensesToShow)) {
      this.hasExpenses = true;
    } else {
      this.hasExpenses = false;
    }
  }

  realFilter() {
    console.log(this.initDate, this.endDate);
    var init = this.initDate;
    var end = this.endDate;
    if (!_.isEmpty(this.expensesToShow)) {
      this.expensesToShow = _.filter(this.expenses, function(exp){
        console.log("date", exp.date.toISOString());
        return ((exp.date.toISOString() >= init) && (exp.date.toISOString() < end));
      });

      console.log("expensesToShow", this.expensesToShow);

      this.getTotal();
    }

  }

  saveExpense(newExpense) {
    newExpense.date = new Date();

    if (_.isNull(this.expenses)) {
      this.expenses = [];
    }

    this.expenses.push(newExpense);
    this.storage.set('gastos', this.expenses);

    this.newExpense = {
      type: "",
      name: "",
      rode: 0,
      description: ""
    };
    this.filterDate();
    console.log('new gastos', this.expenses);
  }

  deleteExpense(expense) {
    console.log("borrar Gasto", expense);
    var index = _.indexOf(this.expenses, expense);
    console.log("index", index);
    if (!_.isUndefined(index)) {
      this.expenses = _.without(this.expenses, expense);
      this.storage.set('gastos', this.expenses);
      this.filterDate();
      this.getTotal();
    } else {
      console.log("error, no se encuentra el gasto");
    }
  }

  getTotal() {
    var total = 0;
    if (!_.isEmpty(this.expensesToShow)) {
      for (let i = 0; i < this.expensesToShow.length; i++) {
        total += (this.expensesToShow[i].rode) * 1;
      }
    }
    return total;
  }

}
