import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { DrawpadPage } from '../drawpad/drawpad';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { File } from '@ionic-native/file';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { UtilsProvider } from '../../providers/utils/utils';

@IonicPage()
@Component({
	selector: 'page-order',
	templateUrl: 'order.html',
})
export class OrderPage {

	order: any;
	parentPage: any;

	constructor(public navCtrl: NavController, public navParams: NavParams,
		public localStorage: LocalStorageProvider, public viewer: DocumentViewer,
		public modalCtrl: ModalController, public platform: Platform,
		public utils: UtilsProvider, public file: File) {

		this.parentPage = this.navParams.get("parentPage");
		this.order = this.navParams.get('order');
		this.order.itemList = this.order.itemList || [];
	}

	openViewer() {

		var options = {
			title: '__perfumes 300',
			documentView: {
				closeLabel: 'Cerrar'
			},
			navigationView: {
				closeLabel: 'Close'
			},
			email: { enabled: true },
			print: { enabled: true },
			openWith: { enabled: true },
			bookmarks: { enabled: true },
			search: { enabled: true }
		}
	}

	refresItemList(order) {
		this.order.itemList = order.itemList || [];
		this.localStorage.updateServices(this.order);
	}

	ionViewWillLeave() {
		this.parentPage.ionViewWillEnter();
	}

	addNewForm() {
		this.navCtrl.push('FormPage', { 'order': this.order, 'parentPage': this, 'action': 'new' });
	}

	goToForm(indx) {
		this.navCtrl.push('FormPage', { 'order': this.order, 'parentPage': this, 'action': 'update', 'indx': indx });
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


	makePdf() {

		let _self = this;
		pdfmake.vfs = pdfFonts.pdfMake.vfs;

		//start the loading component
		this.utils.openLoading().then(() => {

			let logoSrc = 'assets/imgs/logoInvitroAlfa_968x576.png';
			var docDefinition = {
				content: [{
					columns: [
						[{ text: 'BITCOIN', style: 'header' }, { text: 'Cryptocurrency Payment System', style: 'sub_header' }, { text: 'WEBSITE: https://bitcoin.org/', style: 'url' },
						]]
				}],
				styles: {
					header: {
						bold: true,
						fontSize: 20,
						alignment: 'right'
					},
					sub_header: {
						fontSize: 18,
						alignment: 'right'
					},
					url: {
						fontSize: 16,
						alignment: 'right'
					}
				},
				pageSize: 'A4',
				pageOrientation: 'portrait'
			};

			if (this.platform.is('cordova')) {
				try {
					//stop the loading component
					this.utils.dismissLoading();
					this.utils.showMessage('Iniciando carga de archivo');
					pdfmake.createPdf(docDefinition).getBuffer(function (buffer: Uint8Array) {
						try {
							let utf8 = new Uint8Array(buffer);
							let binaryArray = utf8.buffer;
							_self.utils.showMessage('Archivo creado exitosamente');
							_self.saveToDevice(binaryArray, "Invitro.pdf");
						} catch (e) {
							_self.utils.showMessage('error' + e);
						}
					}); 
				
				} catch (err) {
					_self.utils.showMessage('error' + err);
				} 
			}
			else {
				//stop the loading component
				_self.utils.dismissLoading();
				pdfmake.createPdf(docDefinition).open();
			}
		});
	}

	saveToDevice(data: any, savefile: any) {
		this.file.writeFile(this.file.externalDataDirectory, savefile, data, { replace: false });
		this.utils.showMessage('File saved to your device');
	}

	saveAndOpenPdf(pdfBlob: any, filename: string) {
		let options = {
			title: 'Invitro - Plantilla',
			documentView: { closeLabel: 'Cerrar' },
			navigationView: { closeLabel: 'Close' },
			email: { enabled: true },
			print: { enabled: true },
			openWith: { enabled: true },
			bookmarks: { enabled: true },
			search: { enabled: true }
		}
		const writeDirectory = this.platform.is('ios') ? this.file.dataDirectory : this.file.externalDataDirectory;
		this.file.writeFile(writeDirectory, filename, pdfBlob, { replace: true })
			.then(() => {
				this.viewer.viewDocument(writeDirectory + filename, "application/pdf", options);
				/*this.opener.open(writeDirectory + filename, 'application/pdf')
					.catch(() => {
						_self.utils.showMessage('Error opening pdf file');
					});*/
			})
			.catch(() => {
				this.utils.showMessage('Error writing pdf file');
			});
	}

}