import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NetworkNotifyComponent } from './network-notify/network-notify';
import { SignaturePadComponent } from './signature-pad/signature-pad'; 

@NgModule({
	declarations: [NetworkNotifyComponent,SignaturePadComponent],
	imports: [IonicModule],
	exports: [NetworkNotifyComponent,SignaturePadComponent]
})
export class ComponentsModule {}
