import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/timeout'; // otherwise http client for timeout
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';

@Injectable()
export class RestProvider {

	//apiUrl = 'http://192.168.0.20:3636/rest'; --MyIP for wifi
	apiUrl = 'http://www.mocky.io/v2';

	constructor(public http: HttpClient, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

	}

	httpAuth(url, data) {

		let sendHttp: any;

		if (data) {
			data = JSON.stringify(data);
			sendHttp = this.http.post(url, data);
		}
		else {
			sendHttp = this.http.get(url);
		}

		return new Promise(resolve => {
			sendHttp
				.timeout(10000)
				.subscribe((result) => {

					resolve(result);

				}, error => {
					resolve({ error: error });
				});
		});
	}

	getAuthSession(data) {
		//let url = this.apiUrl + '/Login/';
		let url = this.apiUrl+'/5c7428a32f000036009640ca/';
		return this.httpAuth(url, data);
	}

}
