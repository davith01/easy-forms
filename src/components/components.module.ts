import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NetworkNotifyComponent } from './network-notify/network-notify';
import { SignaturePadComponent } from './signature-pad/signature-pad';
import { SignatureDrawPadComponent } from './signature-draw-pad/signature-draw-pad';

@NgModule({
	declarations: [NetworkNotifyComponent,SignaturePadComponent,
    SignatureDrawPadComponent],
	imports: [IonicModule],
	exports: [NetworkNotifyComponent,SignaturePadComponent,
    SignatureDrawPadComponent]
})
export class ComponentsModule {}
