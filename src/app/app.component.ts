import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
	templateUrl: 'app.html'
})

export class MyApp {

	rootPage: any = 'LoginPage';

	constructor(public platform: Platform, public events: Events,
				public statusBar: StatusBar, public splashScreen: SplashScreen) {
		
		// Okay, so the platform is ready and our plugins are available.
		// Here you can do any higher level native things you might need.
		platform.ready().then(() => {
			statusBar.styleDefault();
			splashScreen.hide();
		});
	}
}
