import { Component,ViewChild } from '@angular/core';
import { SignaturePadComponent } from '../../components/signature-pad/signature-pad';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-drawpad',
  templateUrl: 'drawpad.html'
})
export class DrawpadPage {

@ViewChild(SignaturePadComponent) public signaturePadComponent : SignaturePadComponent;

  public signaturePadOptions : Object = {
    'minWidth': 2,
    'canvasWidth': 340,
    'canvasHeight': 200
  };
  public signatureImage : string;
  
  constructor(public navCtrl: NavController, public viewCtrl : ViewController) { 
	//HTMLCanvasElement
	this.signaturePadComponent.initSignaturePad(this.signaturePadOptions);
  }

  closeModal(){
    this.navCtrl.pop();
  }

  drawComplete() {
    this.signatureImage = this.signaturePadComponent.toDataURL();
    let data  = {signatureImage: this.signatureImage};
	this.viewCtrl.dismiss(data);
  }

  drawClear() {
    this.signaturePadComponent.clear();
  }
  
  canvasResize() {
    let canvas = document.querySelector('canvas');
    this.signaturePadComponent.minWidth = 1;
  }

  ngAfterViewInit() {
	this.signaturePadComponent.clear();
	this.canvasResize();
  }

}
