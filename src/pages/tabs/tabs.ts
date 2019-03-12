import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NetworkNotifyComponent } from '../../components/network-notify/network-notify';
 
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
 
  ordersRoot: any = 'OrdersPage';
  historyRoot: any = 'HistoryPage';
  othersRoot: any = 'OthersPage';

  myIndex: number;
 @ViewChild(NetworkNotifyComponent) public networkNotifyComponent : NetworkNotifyComponent;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // Set the active tab based on the passed index from menu.ts
    this.myIndex = navParams.data.tabIndex || 0;
  }
}