import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { DrawpadPage } from '../drawpad/drawpad';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';

declare var cordova:any;    //global;

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html', 
})
export class OrderPage {

  order: any;
  parentPage: any;
  error: any;
  error2: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
			  public localStorage: LocalStorageProvider, public viewer: DocumentViewer,
			  public modalCtrl: ModalController, public platform: Platform) {
		
	  this.parentPage = this.navParams.get("parentPage");
	  this.order = this.navParams.get('order');
	  this.order.itemList = this.order.itemList  || [];
	  
	  this.error = 'error';
	  this.error2 = 'error2';
  }

  openViewer(){
	  
	var options = {
		title: '__perfumes 300',
		documentView : {
			closeLabel : 'Cerrar'
		},
		navigationView : {
			closeLabel : 'Close'
		},
		email : { enabled : true },
		print : { enabled : true  },
		openWith : { enabled : true },
		bookmarks : { enabled : true },
		search : { enabled : true }
	}
	  
	if(this.platform.is('cordova')) {
			
		
		let url = 'assets/perfumes.pdf';
		let onMissingApp = function (appId, installer) {
			installer();
		}
		let onImpossible = function (){
			this.error = 'document can\'t be shown';
		}
		let onError = function (error){
		  window.console.log(error);
		  this.error = 'Sorry! Cannot show document.';
		  this.error2 = JSON.stringify(error);
		}
		
		let onPossible = function (){
		  this.error = 'document can be shown';
		  this.viewer.viewDocument('assets/perfumes.pdf', 'application/pdf', options);
		}
		
		cordova.plugins.SitewaertsDocumentViewer.canViewDocument(
			url, 'application/pdf', options, onPossible, onMissingApp, onImpossible, onError);
	}
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
		  fileName: 'perfumes.pdf',
		  baseUrl: 'assets/'
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
