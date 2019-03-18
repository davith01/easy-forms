import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NetworkNotifyComponent } from './network-notify/network-notify';
import { SignaturePadComponent } from './signature-pad/signature-pad';
import { SignatureDrawPadComponent } from './signature-draw-pad/signature-draw-pad';
import { MessageNavComponent } from './message-nav/message-nav';

@NgModule({
	declarations: [NetworkNotifyComponent,SignaturePadComponent,
    SignatureDrawPadComponent,
    MessageNavComponent],
	imports: [IonicModule],
	exports: [NetworkNotifyComponent,SignaturePadComponent,
    SignatureDrawPadComponent,
    MessageNavComponent]
})
export class ComponentsModule {}
