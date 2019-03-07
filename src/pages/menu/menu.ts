import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav } from 'ionic-angular';
import { LoadingController, ToastController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';


export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  
  rootPage = 'TabsPage';
  showFingerPrint = false;
  disableFingerPrint = false;
  
  @ViewChild(Nav) nav: Nav;

  pages = [
    { title: 'App', pageName: 'TabsPage', tabComponent: 'appRoot', index: 0, icon: 'apps' },
    { title: 'Forms', pageName: 'TabsPage', tabComponent: 'formRoot', index: 1, icon: 'albums' },
    { title: 'Drawpad', pageName: 'TabsPage', tabComponent: 'drawRoot', index: 2, icon: 'paper-plane' }
  ];

  constructor(public navCtrl: NavController, public platform: Platform,
    public localStorage: LocalStorageProvider,
    public toastCtrl: ToastController) {
		
		//retrive finger print authentication data
		this.localStorage.getFingerPrintAuth().then((result) => {
			this.showFingerPrint = result ?  true : false;
		});
  }

  openPage(page: PageInterface) {
    let params = {};

    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
    }

    let childNav = this.nav.getActiveChildNavs()[0];

    // The active child nav is our Tabs Navigation
    if (childNav && page.index != undefined) {

      childNav.select(page.index);

    } else {
      // Tabs are not active, so reset the root page 
      // In this case: moving to or from SpecialPage
      this.nav.setRoot(page.pageName, params);
    }
  }

  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNavs()[0];

    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
    return;
  }

  removeFingerPrint() {
    this.localStorage.removeFingerPrintAuth();
	this.disableFingerPrint = true;
    this.showToast('FingerPrint removed !!');
  }

  logOut() {
    let params = { 'message': 'logout successs' };
    this.navCtrl.setRoot('LoginPage', params);
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top'
    });

    toast.present(toast);
  }
  
}