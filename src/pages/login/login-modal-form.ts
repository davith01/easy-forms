import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'login-modal-form.html'
})
export class LoginModalForm {

	email: string;
	password: string;

	constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams) {

	}

	loginComplete() {
		let data = { email: this.email, password: this.password };
		this.viewCtrl.dismiss(data);
	}

	closeModal() {
		this.navCtrl.pop();
	}

}
