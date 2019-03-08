import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/timeout'; // otherwise http client for timeout
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';

@Injectable()
export class RestApiProvider {
 
	constructor(public http: HttpClient, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

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
		let headers = new HttpHeaders({
		  'Content-Type': 'application/json',
		});
		return new Promise(resolve => {
			this.http.get(url,{headers: headers})
				//.timeout(10000)
				.subscribe((result) => {

					resolve( result );

				}, error => {
					resolve({ error: error });
				});
		});
	}
 
	getAuthSession(data) {
		let url =  'http://tester.estrategicacomunicaciones.com/invitro/api/login?email='+data.email+'&password='+data.password;
		return this.httpAuthGet(url);
	}
	
	getOrders() {
		let url =  'http://tester.estrategicacomunicaciones.com/invitro/api/orders_approve';
		return this.httpAuthGet(url);
	}
}
