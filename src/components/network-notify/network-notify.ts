import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { Network } from '@ionic-native/network/ngx';


@Component({
  selector: 'network-notify-component',
  templateUrl: 'network-notify.html'
})
export class NetworkNotifyComponent {

  statusClass: string;
  platformInfo: any;
  previousStatus: any = 'x';
  status: any = { color: 'grey' };

  constructor(public network: Network, public platform: Platform) {
		
		this.platform.ready().then((readySource) => {
			this.platformInfo = this.getPlatformInfo(readySource);
			if(this.platform.is('cordova')) {
				this.initializeNetworkEvents();
			}
		});
		
    }
	
	initializeNetworkEvents() {
		
		this.network.onDisconnect().subscribe(() => {
			if (this.previousStatus === 'Online') {
				//this.eventCtrl.publish('network:offline');
				this.status.color = 'red';
				
			}
			this.previousStatus = 'Offline';
		});
		this.network.onConnect().subscribe(() => {
			if (this.previousStatus === 'Offline') {
				//this.eventCtrl.publish('network:online');
				this.status.color = 'green';
			}
			this.previousStatus = 'Online';
		});
    }
	
    getPlatformInfo(readySource) {
		  return { 'core': this.platform.is('core').toString(),
				   'cordova': this.platform.is('cordova').toString(),
				   'cordova2': window.hasOwnProperty('cordova'),
				   'android': this.platform.is('android').toString(),
				   'mobileweb': this.platform.is('mobileweb').toString(),
				   'list': JSON.stringify(this.platform.platforms()),
				   'version': JSON.stringify(this.platform.versions()),
				   'tablet': this.platform.is('tablet').toString(),
				   'Landscape': this.platform.isLandscape().toString(),
				   'Portrait': this.platform.isPortrait().toString(),
				   'readySource': readySource.toLowerCase()
			}
    }
}