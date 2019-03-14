import { Component,ViewChild } from '@angular/core';
import { NavController, ViewController, Platform } from 'ionic-angular';
import { SignatureDrawPadComponent } from '../../components/signature-draw-pad/signature-draw-pad';

@Component({
  selector: 'page-drawpad',
  templateUrl: 'drawpad.html'
})
export class DrawpadPage {

@ViewChild(SignatureDrawPadComponent) public signatureDrawPad : SignatureDrawPadComponent;

  public signaturePadOptions : Object = {
    
  };
  public signatureImage : string;
  
  constructor(public navCtrl: NavController, public viewCtrl : ViewController,
			  public platform: Platform,) { 
	
	this.platform.ready().then((readySource) => {
      
    });
	
  }

  closeModal(){
    this.navCtrl.pop();
  }
  
  initSignature() {
	this.signatureDrawPad.initSignaturePad(this.signaturePadOptions);
  }

  drawComplete() {
    this.signatureImage = this.signatureDrawPad.toDataURL();
    let data  = {signatureImage: this.signatureImage};
	this.viewCtrl.dismiss(data);
  }

  drawClear() {
    this.signatureDrawPad.clear();
  }
  
  ngAfterViewInit() {
	if(this.signatureDrawPad) {
		this.signatureDrawPad.initSignaturePad(this.signaturePadOptions);
		this.signatureDrawPad.clear();
		this.signatureDrawPad.minWidth = 1;
	}
  }
}
