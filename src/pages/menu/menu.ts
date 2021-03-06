import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { NetworkNotifyComponent } from '../../components/network-notify/network-notify';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { UtilsProvider } from '../../providers/utils/utils';

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
  @ViewChild(NetworkNotifyComponent) public networkNotifyComponent : NetworkNotifyComponent;
  pages = [
    { title: 'Ordenes', pageName: 'TabsPage', tabComponent: 'appRoot', index: 0, icon: 'apps' },
    { title: 'Servicios', pageName: 'TabsPage', tabComponent: 'historyRoot', index: 1, icon: 'paper' }
  ];

  constructor(public navCtrl: NavController, public platform: Platform,
			  public localStorage: LocalStorageProvider, 
			  public restApi: RestApiProvider,
			  public utils: UtilsProvider) {
		
		//retrive finger print authentication data
		this.localStorage.getFingerPrintAuth().then((result) => {
			this.showFingerPrint = result ?  true : false;
		});
		
		this.loadOrders();
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
    this.utils.showMessage('FingerPrint removed !!');
  }

  logOut() {
    let params = { 'message': 'logout successs' };
    this.navCtrl.setRoot('LoginPage', params);
  }

  loadOrders() {
		let  typesForms = [{
			"name": "Evaluación de receptoras",
			"icon": "color-fill",
			"color": "orangered"
		},{
			"name": "Aspiración Folicular",
			"icon": "attach",
			"color": "blue"
		},{
			"name": "Transferencia de embriones",
			"icon": "bonfire",
			"color": "grey"
		},{
			"name": "Diagnóstico (Dx1)",
			"icon": "aperture",
			"color": "green"
		}];
		
		let listTypes = [typesForms[0],typesForms[0],typesForms[3],typesForms[2],typesForms[1],typesForms[1],typesForms[3]];
		
		//start the loading component
		this.utils.openLoading().then(() => {
		
			//invoke rest orders api 
			this.localStorage.getServices().then((orders) => {
				if(!orders) {
					this.restApi.getServices().then((result: any) => {
						
						//stop the loading component
						this.utils.dismissLoading(); 
						
						if(result && !result.error){
							let i =0;
							let orders = [];
							for(let res of result){
								res.type =  listTypes[i];
								i++;
								orders.push(res);
							}
							this.localStorage.setServices(orders);
						}
					});
				} else {
					//stop the loading component
					this.utils.dismissLoading(); 
				}
			});
			
			this.restApi.getOrders().then((orders: any) => {
				if(orders && !orders.error) {
					this.localStorage.setOrders(orders);	
				}
			});
			
		});
   }
}