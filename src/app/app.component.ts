import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
//import { Network } from '@ionic-native/network';
import { NetworkProvider } from '../providers/network/network';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
	templateUrl: 'app.html'
})

export class MyApp {

	rootPage: any = 'LoginPage';

	constructor(
		public platform: Platform, public network: NetworkProvider, public events: Events, public statusBar: StatusBar, public splashScreen: SplashScreen) {
		//public network: Network, 


		// Okay, so the platform is ready and our plugins are available.
		// Here you can do any higher level native things you might need.
		platform.ready().then(() => {

			statusBar.styleDefault();
			splashScreen.hide();

			this.network.initializeNetworkEvents();

			// Offline event
			this.events.subscribe('network:offline', () => {
				alert('network:offline ==> ' + this.network.previousStatus);
			});

			// Online event
			this.events.subscribe('network:online', () => {
				alert('network:online ==> ' + this.network.previousStatus);
			});


		});
	}
}
