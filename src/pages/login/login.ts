import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { LoadingController, ToastController } from 'ionic-angular';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { RestProvider } from '../../providers/rest/rest';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { ViewController } from 'ionic-angular';
import { LoginModalForm } from './login-modal-form';


export interface ResponseRestInterface {
	accessToken: string;
	data?: any;
	message?: string;
	error?: any;
}

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	loginEmail: string;
	loginPassword: string;
	showFingerPrint =  false;

	constructor(public navCtrl: NavController, public navParams: NavParams,
		public faio: FingerprintAIO, public modalCtrl: ModalController,
		public localStorage: LocalStorageProvider, public restProvider: RestProvider,
		public toastCtrl: ToastController, public loadingCtrl: LoadingController) {

		this.faio.isAvailable().then(result => {
			this.showFingerPrint = true;
		}).catch(err => {
			this.showToast(err);
			this.showFingerPrint = false;
		});
		
		//Inizialize the local storage for user authentication
		this.localStorage.loadUserAuthentication();
	}

	goToHome(type, data) {

		if (type === 'Login') {
			data = { 'email': this.loginEmail, 'password': this.loginPassword };
		}
		else if (type === 'FingerPrint') {
			data = { 'email': data.loginEmail, 'password': data.loginPassword };
		}

		let loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});

		loading.present().then(() => { //start the loading component
			//invoke rest
			this.restProvider.getAuthSession(data).then((result: ResponseRestInterface) => {

				loading.dismiss(); //stop the loading component

				if (result.accessToken) {

					//if session is ok, save to localstorage
					this.localStorage.addUserAuthentication(data);

					//save the fingerprint autentication
					if (type === 'FingerPrint') {
						this.localStorage.setFingerPrint(data);
					}

					//continue with app
					this.navCtrl.setRoot('MenuPage');

				}
				else if (result.error) { // if network doesn't work

					let userAuth = this.localStorage.getUsersAuthentication(data);
					if (userAuth) {
						//continue with app
						this.navCtrl.setRoot('MenuPage');
					}
					else {
						let messageErr = 'Can\'t get user session';
						this.showToast(messageErr);
					}
				}

			});
		});

	}


	loginFingerPrint() {
		this.localStorage.getFingerPrint().then((result) => {
			if (result) {
				this.goToHome('FingerPrint', result);
			} else {

				let modal = this.modalCtrl.create(LoginModalForm);
				modal.present();
				modal.onDidDismiss((data: any) => {
					if (data) {
						this.goToHome('FingerPrint', data);
					}
				});
			}
		});
	}

	startFingerPrint() {
		this.faio.show({
			clientId: 'Fingerprint-easyForm',
			clientSecret: '_password_', // Only Android
			localizedFallbackTitle: 'Use _Pin_', // Only iOS
			localizedReason: '_Please authenticate_' // Only iOS
		})
			.then((result: any) => {
				this.showToast(result);
				this.loginFingerPrint();
			})
			.catch((error: any) => {
				this.showToast(error);
			});
	}


	showToast(message: string) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 2000,
			position: 'top'
		});
		toast.present(toast);
	}
}
