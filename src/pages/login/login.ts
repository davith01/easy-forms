import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { LoadingController, ToastController } from 'ionic-angular';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { LoginModalForm } from './login-modal-form';
import { NetworkNotifyComponent } from '../../components/network-notify/network-notify';

export interface LoginResponseInterface {
	success: any;
	error?: any;
} 

export interface LoginRequestInterface {
	email: string;
	password: string;
}

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	showFingerPrint =  false;
	networkMessage: any;

	@ViewChild(NetworkNotifyComponent) public networkNotifyComponent : NetworkNotifyComponent;
	
	constructor(public navCtrl: NavController, public navParams: NavParams,
				public faio: FingerprintAIO, public modalCtrl: ModalController, 
				public localStorage: LocalStorageProvider, public restApi: RestApiProvider,
				public toastCtrl: ToastController, public loadingCtrl: LoadingController) {

		//initialize the FingerPrint control
		this.faio.isAvailable().then(result => {
			this.showFingerPrint = true;
		}).catch(err => {
			this.showFingerPrint = false;
		}); 
		
	} 
	
	goToHome() {
		//continue with access to the app
		this.navCtrl.setRoot('MenuPage');
	}
	
	validateUserAuthentication(type: string, data: LoginRequestInterface) {

		let loading = this.loadingCtrl.create({
			content: 'Por favor espere...'
		});

		loading.present().then(() => { //start the loading component
		
			let userAuth = { 'email': data.email, 'password': data.password };
		
			//invoke rest api authentication
			this.restApi.getAuthSession(userAuth).then((result: LoginResponseInterface) => {

				//stop the loading component
				loading.dismiss(); 
				
				this.networkMessage = JSON.stringify(result);
				
				/*if (result.success) { 

					//if session is ok, save to localstorage
					this.localStorage.setUserAuth(userAuth);

					//save the fingerprint autentication
					if (type === 'FingerPrint') {
						this.localStorage.setFingerPrintAuth(userAuth);
					}

					this.goToHome();
				}
				else if (result.error) { 
					
					//user or password error
					if(result.error.status === 401) {
						let messageErr = 'Usuario o contraseña no validos';
						this.showToast(messageErr);
					}
					else {
						// TODO: if network doesn't work
						let _self = this;	
						// validate user authentication cache
						this.localStorage.isUserAuth(userAuth,function(isValid){
							if (isValid) {
								//continue with access to the app
								_self.navCtrl.setRoot('MenuPage');
							}
							else {
								let messageErr = 'No puede iniciar sesión de usuario';
								_self.showToast(messageErr);
							}	
						});
					}
				}
				*/

			});
		});

	} 

	loginFingerPrint() {
		
		//Retrive finger print authentication
		this.localStorage.getFingerPrintAuth().then((result) => {
			
			if (result) {
				this.validateUserAuthentication('FingerPrint', result);
			} else {

				//show modal to request data
				let modal = this.modalCtrl.create(LoginModalForm);
				modal.present();
				modal.onDidDismiss((userAuth: any) => {
					if (userAuth) {
						this.validateUserAuthentication('FingerPrint', userAuth);
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
	
	storageUsers: string;
	
	getUserAuth() {
		this.localStorage.getUserAuth().then((result) => {
			this.storageUsers = JSON.stringify(result||[]);
		});
	}
	
	
}
