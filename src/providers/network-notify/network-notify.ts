import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/timeout'; // otherwise http client for timeout
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { Network } from '@ionic-native/network/ngx';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

export interface ResponseRestInterface {
	accessToken: string;
	userAuth?: any;
	message?: string;
	error?: any;
}


@Injectable()
export class NetworkNotifyProvider {

    constructor(private network: Network, public platform: Platform,
				public restApi: RestApiProvider, public http: HttpClient) {
					
    }
	
	networkStatus(connectSubscription,disconnectSubscription){
		
		this.initializeNetworkEvents(connectSubscription,disconnectSubscription);	
		setInterval(() => {
			this.initializeNetworkEvents(connectSubscription,disconnectSubscription);
		}, 30000);
		
	}
	
    initializeNetworkEvents(connectSubscription,disconnectSubscription) {
		
		this.platform.ready().then((readySource) => {
		  console.log('Platform ready from', readySource);
		  // Platform now ready, execute any required native code
		});
		
		let res = 'res:'.concat('Platform is Core ', this.platform.is('core').toString()).
		concat('Platforms list: ', JSON.stringify(this.platform.platforms())).
		concat('Platform version ', JSON.stringify(this.platform.versions())).
		concat('Platform Current URL ', this.platform.url()).
		concat('Platform is android ', this.platform.is('android').toString()).
		concat('Platform is cordova ', this.platform.is('cordova').toString()).
		concat('Platform is mobile ', this.platform.is('mobile').toString()).
		concat('Platform is mobileweb ', this.platform.is('mobileweb').toString()).
		concat('Platform is tablet ', this.platform.is('tablet').toString()).
		concat('Platform is phablet ', this.platform.is('phablet').toString()).
		concat('Platform is windows ', this.platform.is('windows').toString()).
		concat('Platform is Landscape ', this.platform.isLandscape().toString()).
		concat('Platform is Portrait ', this.platform.isPortrait().toString()).
		concat('Platform is Lang ', this.platform.lang().toString());
		
		//let apiUrlTest = 'http://192.168.0.20:3636/test'; //MyIP for wifi
		let apiUrlTest = 'http://www.mocky.io/v2/5c7428a32f000036009640ca';
		this.http.post(apiUrlTest,{})
		.timeout(5000)
		.subscribe((result) => {
			connectSubscription('network connected!! []'+res);
		}, error => {
			disconnectSubscription('network was disconnected :-('+res);
		});
    }
}