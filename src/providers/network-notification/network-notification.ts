import { Injectable } from '@angular/core';
import { AlertController, Events } from 'ionic-angular';
import { Network } from '@ionic-native/network/ngx';

@Injectable()
export class NetworkNotificationProvider {

    constructor(/*private network: Network*/) {
    }
	
    public initializeNetworkEvents(connectSubscription,disconnectSubscription): void {
		
		// watch network for a disconnection
		/*
		this.network.onDisconnect().subscribe(() => {
		  console.log('network was disconnected :-(');
		  //disconnectSubscription('network was disconnected :-(');
		});
        
		// watch network for a connection
		this.network.onConnect().subscribe(() => {
		  // We just got a connection but we need to wait briefly
		  // before we determine the connection type. Might need to wait.
		  // prior to doing any api requests as well.
		  setTimeout(() => {
			//connectSubscription('network connected!! ['+this.network.type+']');
			console.log('network connected!! ['+this.network.type+']');
		  }, 3000);
		});
		*/
		
    }

}