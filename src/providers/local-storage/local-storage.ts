import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class LocalStorageProvider {


	public usersAuthentication = [];

	constructor(private storage: Storage) {

		this.storage.get('user-auth').then((result) => {
			if (result) {
				this.usersAuthentication = result;
			}
		});

	}

	addUserAuthentication(dataAuth) {
		this.usersAuthentication.push(dataAuth);
		this.storage.set('users-auth', this.usersAuthentication);
	}

	getUsersAuthentication(dataAuth) {
		let userAuthList = this.usersAuthentication.filter((userAuth) => {
			if (userAuth.email === dataAuth.email && userAuth.password === dataAuth.password) {
				return true;
			}
			return false;
		});
		if (userAuthList) {
			return userAuthList[0];
		}
		else return false;
	}

	getFingerPrint() {
		return this.storage.get('fingerPrint-auth');
	}

	setFingerPrint(fingerPrintAuth) {
		this.storage.set('fingerPrint-auth', fingerPrintAuth);
	}

	removeFingerPrint() {
		return this.storage.remove('fingerPrint-auth');
	}

}