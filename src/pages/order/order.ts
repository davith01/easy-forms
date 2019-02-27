import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DrawpadPage } from '../drawpad/drawpad';

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  order: any;
  signatureImage: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
	  this.order = this.navParams.get('order');
	  this.order.itemList = this.order.itemList  || [];
  }
  
  addNewForm() {
    this.navCtrl.push('FormPage');
  }

  goToForm(item) {
    this.navCtrl.push('FormPage',{'item':item});
  }
  
  ionViewWillLoad() {
	  this.order.itemList = this.navParams.get('itemList') || [];
  }
  
  doChangeSignature(data) {
    this.signatureImage = data;
  };


  openSignatureModel() {
    let modal = this.modalCtrl.create(DrawpadPage);
    modal.present();
    modal.onDidDismiss((data: any) => {
      if (data) {
        this.doChangeSignature(data.signatureImage);
      }
    });
  }
}
