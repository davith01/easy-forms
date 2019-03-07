import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { DrawpadPage } from '../drawpad/drawpad';


declare var cordova:any;    //global;

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  order: any;
  signatureImage: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
			  public modalCtrl: ModalController, public platform: Platform) {
				  
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
  }

  openSignatureModel() {
    let modal = this.modalCtrl.create(DrawpadPage);
    modal.present();
    modal.onDidDismiss((data: any) => {
      if (data) {
        this.doChangeSignature(data.signatureImage);
      }
    });
  }
  
  createPDF() {
	  var options = {
		  documentSize: "A4",
		  landscape: "portrait",
		  type: "share",
		  fileName: 'my-pdf.pdf'
	  }
	 
	  var pdfhtml = '<html><body>This is the pdf content</body></html>';
	  
	  if(this.platform.is('cordova')) {
		  cordova.plugins.pdf.fromData(pdfhtml,options)
		  .then((status) => {
			  alert('pdf status '+status);
		  })
		  .catch((err) => {
			alert('pdf error'+err);  
		  });
	  }
  }
}
