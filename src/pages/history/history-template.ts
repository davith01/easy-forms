import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'history-template',
  templateUrl: 'history-template.html'
})
export class HistoryTemplate {
	
	@Input() order: any;
	
	constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams) {

	}
}
