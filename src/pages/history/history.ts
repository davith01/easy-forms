import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  dataHeader: any = {};
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
	
	let currentDate: String = new Date().toISOString();
	this.dataHeaders = [{ "orderId":6,
				 "clientName":"Alberto Jose Assis Burgos", 
				 "local": "San Marcos", 
				 "city": "San Marcos", 
				 "date":  currentDate},
				 { "orderId":7,
				 "clientName":"Agroindustria Ganadera S.A.S", 
				 "finca": "Valparaiso",
				 "date":  currentDate},
				 { "orderId":8,
				 "clientName":"Reproduccion animal S.A.S", 
				 "local": "San Rafael", 
				 "city": "Bogotá", 
				 "date":  currentDate}
				 ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

}
