import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';

@Injectable()
export class UtilsProvider {

  private loading: any;
  
  constructor(public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
		
  }
  
  openLoading(){
	  this.loading = this.loadingCtrl.create({
		  content: 'Por favor espere...'
	  });
	  return this.loading.present();
  }
  
  dismissLoading(){
	  this.loading.dismiss();
  }
  
  showMessage(message: string){
	 let toast = this.toastCtrl.create({
			message: message,
			duration: 2000,
			position: 'top'
		});
		toast.present(toast);
  }

}
