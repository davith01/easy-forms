import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/timeout'; // otherwise http client for timeout
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

@Injectable()
export class RestApiProvider {
 
	constructor(public http: HttpClient, public localStorage: LocalStorageProvider,
				public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

	}
	
	httpAuthPost(url, data) {
		
		let headers = new HttpHeaders({
		  'Content-Type': 'application/json'
		});
 
		return new Promise(resolve => {
			this.http.post(url, JSON.stringify(data) , {headers: headers})
				.timeout(10000)
				.subscribe((result) => {
					resolve( result );
				}, error => {
					resolve({ error: error });
				});
		});
	}
	
	httpAuthGet(url) { 
		let token = this.localStorage.getTokenAuth();
		
		let headers = new HttpHeaders({
		  'Content-Type': 'application/json',
		  'Authorization': 'Bearer ' + token
		}); 
		return new Promise(resolve => {
			this.http.get(url,{headers: headers})
				.timeout(10000)
				.subscribe((result) => {

					resolve( result );

				}, error => {
					resolve({ error: error });
				});
		});
	}
 
	getAuthSession(data) {
		let url =  'http://tester.estrategicacomunicaciones.com/invitro/api/login?email='+data.email+'&password='+data.password;
		return this.http.get(url).timeout(10000);
	}
	
	getServices() {
		let url =  'http://www.mocky.io/v2/5c83037730000064006b0bf0';
		return this.httpAuthGet(url);
	}
	
	getOrders() {
		let url =  'http://tester.estrategicacomunicaciones.com/invitro/api/orders_approve';
		return this.httpAuthGet(url);
	}
}
