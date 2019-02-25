import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-finger-print',
  templateUrl: 'finger-print.html',
})
export class FingerPrintPage {

  loginEmail: string;
  loginPassword: string;
  
  constructor(public navCtrl: NavController, public viewCtrl : ViewController, public navParams: NavParams) { }

  loginComplete() {
    let data  = { loginEmail: this.loginEmail, loginPassword: this.loginPassword };
	this.viewCtrl.dismiss(data);
  }
  
  closeModal(){
    this.navCtrl.pop();
  }  

}
