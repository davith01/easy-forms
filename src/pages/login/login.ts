import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { LoginModalForm } from './login-modal-form';
import { NetworkNotifyComponent } from '../../components/network-notify/network-notify';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { UtilsProvider } from '../../providers/utils/utils';

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
	
	@ViewChild(NetworkNotifyComponent) public networkNotifyComponent : NetworkNotifyComponent;
	
	constructor(public navCtrl: NavController, public navParams: NavParams,
				public faio: FingerprintAIO, public modalCtrl: ModalController, 
				public localStorage: LocalStorageProvider, public restApi: RestApiProvider,
				public utils: UtilsProvider) {

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

		//start the loading component
		this.utils.openLoading().then(() => { 
		
			let userAuth = { 'email': data.email, 'password': data.password };
		
			this.restApi.getAuthSession(userAuth) 
			.subscribe((result: LoginResponseInterface) => {
				
				//stop the loading component
				this.utils.dismissLoading();  
				
				//if session is ok, save to localstorage
				if (result.success) { 

					let token = result.success.token;
					this.localStorage.setUserAuth(userAuth);
					this.localStorage.setTokenAuth(token);

					//save the fingerprint autentication
					if (type === 'FingerPrint') {
						this.localStorage.setFingerPrintAuth(userAuth);
					}

					this.goToHome();
				}				
				
			}, error => {
				//stop the loading component
				this.utils.dismissLoading();
				 
				//user or password error
				if(error.status === 401) {
					let messageErr = 'Usuario o contraseña no validos';
					this.utils.showMessage(messageErr);
				}
				else {
					
					// if network doesn't work.. validate user authentication cache
					let _self = this;

					this.localStorage.isUserAuth(userAuth,function(isValid){
						if (isValid) {
							//continue with access to the app
							_self.navCtrl.setRoot('MenuPage');
						}
						else {
							let messageErr = 'No puede iniciar sesión de usuario';
							_self.utils.showMessage(messageErr);
						}	
					});
				}				
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
			this.loginFingerPrint();
		})
		.catch((error: any) => {
			this.utils.showMessage(error);
		});
	}
	
}
