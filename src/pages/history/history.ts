import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, ToastController } from 'ionic-angular';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { HistoryTemplate } from './history-template';


@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})

export class HistoryPage {

  orders: any = [];
  orderSelect: any;
  
  @ViewChild(HistoryTemplate) public historyTemplate : HistoryTemplate;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
			  public localStorage: LocalStorageProvider, public restApi: RestApiProvider,
			  public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
				  
  }
  
  goToOrder(order){
	  this.navCtrl.push('OrderPage',{'order':order, 'parentPage': this});
	  //this.orderSelect = order;
  }
  
  ionViewWillEnter() {
	this.localStorage.getServices().then((result) => {
		this.orders = result;
	});	
  }
}
