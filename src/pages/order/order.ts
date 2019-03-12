import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { DrawpadPage } from '../drawpad/drawpad';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';


declare var cordova:any;    //global;

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html', 
})
export class OrderPage {

  order: any;
  parentPage: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
			  public localStorage: LocalStorageProvider,
			  public modalCtrl: ModalController, public platform: Platform) {
		
	  this.parentPage = this.navParams.get("parentPage");
	  this.order = this.navParams.get('order');
	  this.order.itemList = this.order.itemList  || [];
  }
  
  refresItemList(order){
	  this.order.itemList = order.itemList || [];
	  this.localStorage.updateServices(this.order);
  }
  
  ionViewWillLeave() {
      this.parentPage.ionViewWillEnter();
  }
  
  addNewForm() {
    this.navCtrl.push('FormPage',{'order':this.order, 'parentPage': this, 'action':'new'});
  }

  goToForm(indx) {
    this.navCtrl.push('FormPage',{'order':this.order, 'parentPage': this, 'action':'update', 'indx': indx});
  }
  
  openSignatureModel() {
    let modal = this.modalCtrl.create(DrawpadPage);
    modal.present();
    modal.onDidDismiss((data: any) => {
      if (data) {
		this.order.signatureImage = data.signatureImage;
		this.localStorage.updateServices(this.order);
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
