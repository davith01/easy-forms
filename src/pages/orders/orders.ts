import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, ToastController } from 'ionic-angular';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { RestApiProvider } from '../../providers/rest-api/rest-api';


@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  orders: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
			  public localStorage: LocalStorageProvider, public restApi: RestApiProvider,
			  public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
				  
  }

  ionViewDidLoad() {
	  this.localStorage.getOrders().then((result) => {
		this.orders = result;
	  });
  }
}
