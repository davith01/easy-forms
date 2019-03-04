import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class LocalStorageProvider {

	constructor(private storage: Storage) {
		this.storage.ready().then(() => {
			console.log('storage ready');
		});
	}
	
	getUserAuth() {
		return this.storage.get('users-auth');
	}

	setUserAuth(userAuth) {
		
		//retrive users authentication list
		this.storage.get('users-auth').then((result) => {
			if(result) {
				//return else user authentication
				result = result.filter((dataAuth) => {
					return userAuth.loginEmail !== dataAuth.loginEmail;
				});
			}
			else { 
				result = [];
			}
			//add this user authentication
			result.push(userAuth);
			this.storage.set('users-auth', result);
		});
	}

	//return true if user auth data match in the user auth list
	isUserAuth(userAuth,retrive) {
		
		this.storage.get('users-auth').then((result) => {
			result = result || [];
			let userAuthList = result.filter((dataAuth) => {
				return userAuth.loginEmail === dataAuth.loginEmail && userAuth.loginPassword === dataAuth.loginPassword;
			});
			
			//Return user authentication data if exists
			retrive(userAuthList[0] ? userAuthList[0] : false);
		});
	}

	/* FingerPrintAuth Storage */
	
	getFingerPrintAuth() {
		return this.storage.get('finger-print-auth');
	}

	setFingerPrintAuth(fingerPrintAuth) {
		this.storage.set('finger-print-auth', fingerPrintAuth);
	}
	
	removeFingerPrintAuth() {
		this.storage.remove('finger-print-auth');
	}
	
}