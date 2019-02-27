import { Component,ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-drawpad',
  templateUrl: 'drawpad.html'
})
export class DrawpadPage {

@ViewChild(SignaturePad) public signaturePad : SignaturePad;

  public signaturePadOptions : Object = {
    'minWidth': 2,
    'canvasWidth': 340,
    'canvasHeight': 200
  };
  public signatureImage : string;
  
  constructor(public navCtrl: NavController, public viewCtrl : ViewController) { }

  closeModal(){
    this.navCtrl.pop();
  }

  drawComplete() {
    this.signatureImage = this.signaturePad.toDataURL();
    let data  = {signatureImage: this.signatureImage};
	this.viewCtrl.dismiss(data);
  }

  drawClear() {
    this.signaturePad.clear();
  }
  
  canvasResize() {
    let canvas = document.querySelector('canvas');
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.set('canvasWidth', canvas.offsetWidth);
    this.signaturePad.set('canvasHeight', canvas.offsetHeight);
  }

  ngAfterViewInit() {
	this.signaturePad.clear();
	this.canvasResize();
  }

}
