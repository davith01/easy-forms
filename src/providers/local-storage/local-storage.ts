import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class LocalStorageProvider {

	token: string; 
	
	constructor(private storage: Storage) {
		this.storage.ready().then(() => {
			console.log('storage ready');
		});
	}
	
	/* UserAuthentication Storage */
	
	getUserAuth() {
		return this.storage.get('users-auth');
	}

	setUserAuth(userAuth) {
		
		//retrive users authentication list
		this.storage.get('users-auth').then((usersAuth) => {
			if(usersAuth) {
				//return else user authentication
				usersAuth = usersAuth.filter((dataAuth) => {
					return userAuth.email !== dataAuth.email;
				});
			}
			else { 
				usersAuth = [];
			}
			//add this user authentication
			
			usersAuth.push(userAuth);
			this.storage.set('users-auth', usersAuth);
		});
	} 

	//return true if user auth data match in the user auth list
	isUserAuth(userAuth,retrive) {
		
		this.storage.get('users-auth').then((usersAuth) => {
			usersAuth = usersAuth || [];
			let userAuthList = usersAuth.filter((dataAuth) => {
				return userAuth.email === dataAuth.email && userAuth.password === dataAuth.password;
			});
			
			//Return user authentication data if exists
			retrive(userAuthList[0] ? userAuthList[0] : false);
		});
	}
	
	/* TokenAuth Storage */
	
	getTokenAuth() {
		return this.token;
	}

	setTokenAuth(token) {
		this.token = token;
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
	
	
	/* Ordes Storage */
	
	getOrders() {
		return this.storage.get('orders');
	}

	setOrders(orders) {
		this.storage.set('orders', orders);
	} 
	
	/* Services Storage */
	
	getServices() {
		return this.storage.get('services');
	}

	setServices(orders) {
		this.storage.set('services', orders);
	} 
	
	updateServices(dataOrder) {
		this.getServices().then((orders) => {
			let newList = [];
			for(let order of orders){
				newList.push(order.id === dataOrder.id ? dataOrder : order);
			}
			this.setServices(newList);
		});	
	} 
	
}