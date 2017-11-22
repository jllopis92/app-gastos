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
  expensesToShow = [];
  newExpense: {};
  loading: boolean = true;
  hasExpenses: boolean = false;
  hasDescription: boolean = false;

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

  getTotal() {
    var total = 0;
    if(!_.isEmpty(this.expensesToShow)){
      for (let i = 0; i < this.expensesToShow.length; i++) {
        total += this.expensesToShow[i].rode;
      }
    }

    return total;
  }

}
