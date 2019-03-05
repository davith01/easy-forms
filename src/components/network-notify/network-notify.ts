import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/timeout'; // otherwise http client for timeout

@Component({
  selector: 'network-notify-component',
  templateUrl: 'network-notify.html'
})
export class NetworkNotifyComponent {

  status: boolean = false;

  constructor(public http: HttpClient) {
	  
	   setInterval(() => {
			this.initNetworkNotify();
	   }, 6000);
		
    
  }
  
  initNetworkNotify(){
    let apiUrlTest = 'http://www.mocky.io/v2/5c7428a32f000036009640ca';
	this.http.post(apiUrlTest,{})
	.timeout(5000)
	.subscribe((result) => {
		this.status = true;
	}, error => {
		this.status = false;
	});
  }

}
