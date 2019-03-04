import { Directive, Output, ElementRef, Renderer } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/timeout'; // otherwise http client for timeout


@Directive({
  selector: '[network-notify]' // Attribute selector
})
export class NetworkNotifyDirective {
	
  online: boolean = false;

  constructor(public http: HttpClient,public element: ElementRef, public renderer: Renderer) {
	  
	   setInterval(() => {
			this.initNetworkNotify();
	   }, 30000);
		
    
  }
  
  initNetworkNotify(){
    let apiUrlTest = 'http://www.mocky.io/v2/5c7428a32f000036009640ca';
	this.http.post(apiUrlTest,{})
	.timeout(5000)
	.subscribe((result) => {
		this.onLine();
	}, error => {
		this.offLine();
	});
  }
  
  onLine(){
    this.renderer.setElementStyle(this.element.nativeElement, 'color', 'green');
    this.online = true;
  }
  
  offLine(){
    this.renderer.setElementStyle(this.element.nativeElement, 'color', 'green');
    this.online = false;
  }

}
