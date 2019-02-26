import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

@Component({
	template: `
  <ion-content padding>

    <form (ngSubmit)="loginComplete()">
		<ion-list>
		
		 <p>Does this user accept local storage of fingerprints ? </p>	
		 
		  <ion-item id="login-input1">
			<ion-label stacked> User name</ion-label>
			<ion-input type="email" [(ngModel)]="loginEmail" [ngModelOptions]="{standalone: true}"></ion-input>
		  </ion-item>
		  <ion-item id="login-input2">
			<ion-label stacked> Password </ion-label>
			<ion-input type="password" [(ngModel)]="loginPassword" [ngModelOptions]="{standalone: true}"></ion-input>
		  </ion-item>
		</ion-list>
		<button type="submit" class="login-button" ion-button block color="stable" >
		  Log in
		</button>
	</form>
  
</ion-content>

  `,
})
export class LoginModalForm {

	loginEmail: string;
	loginPassword: string;

	constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams) {

	}

	loginComplete() {
		let data = { loginEmail: this.loginEmail, loginPassword: this.loginPassword };
		this.viewCtrl.dismiss(data);
	}

	closeModal() {
		this.navCtrl.pop();
	}

}
