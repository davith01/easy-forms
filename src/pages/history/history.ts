import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  orders: any = {};
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
	
	let currentDate: String = new Date().toISOString();
	let typesForms = [{
		"name": "Evaluación de receptoras",
		"icon": "color-fill",
		"color": "orangered"
	},{
		"name": "Aspiración Folicular",
		"icon": "attach",
		"color": "blue"
	},{
		"name": "Transferencia de embriones",
		"icon": "bonfire",
		"color": "grey"
	},{
		"name": "Diagnóstico (Dx1)",
		"icon": "aperture",
		"color": "green"
  }];
	
	this.orders = [{ 
				  "orderId":6, "type": typesForms[0],
				 "cliente":"Alberto Jose Assis Burgos", 
				 "local": "San Marcos", 
				 "city": "San Marcos", 
				 "date":  currentDate},
				 { "orderId":7, "type": typesForms[0],
				 "cliente":"Agroindustria Ganadera S.A.S", 
				 "local": "Finca Valparaiso",
				 "city": "Chía", 
				 "date":  currentDate},
				 { "orderId":8, "type": typesForms[1],
				 "cliente":"Reproduccion animal S.A.S", 
				 "local": "San Rafael", 
				 "city": "Bogotá", 
				 "date":  currentDate},
				 { "orderId":9, "type": typesForms[2],
				 "cliente":"Reproduccion animal S.A.S", 
				 "local": "San Rafael", 
				 "city": "Bogotá", 
				 "date":  currentDate},
				 { "orderId":10, "type": typesForms[3],
				 "cliente":"Reproduccion animal S.A.S", 
				 "local": "San Rafael", 
				 "city": "Bogotá", 
				 "date":  currentDate}
				 ];
  }
  
  goToOrder(order){
	  this.navCtrl.push('OrderPage',{'order':order});
  }
  
  

}
