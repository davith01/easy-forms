import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { UtilsProvider } from '../../providers/utils/utils';

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})

export class FormPage {

  order: any;
  parentPage: any;
  ajustList: number = 0;
  action: string;
  dataItem: any;
  itemIndex: any;
  backButton: boolean = false;
  nextButton: boolean = false;
  indx: number;
  
  //validations_form = new FormGroup({
  validations_form = this.formBuilder.group({
		idAnimal: new FormControl('', Validators.required),
		chapeta: new FormControl('', Validators.maxLength(55)),
		diagnostico: new FormControl('', Validators.maxLength(55)),
		apta: null,
		sincronizada: null,
		encargado: new FormControl('', Validators.maxLength(100)),
		observaciones: new FormControl('', Validators.maxLength(100))
	});
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
			  public localStorage: LocalStorageProvider,
			  public formBuilder: FormBuilder, public modal: ModalController,
			  public utils: UtilsProvider) {
	
	  this.order = this.navParams.get('order');
	  this.parentPage = this.navParams.get('parentPage');
	  this.action = this.navParams.get('action');
	  
	  if(this.action === 'update') {
		this.indx = this.navParams.get('indx');
		this.dataItem = this.order.itemList[this.indx];
	  }
	  else if (this.action === 'new') {
		  this.newItem();
	  }
  }
  
  newItem() {
	this.dataItem = {
		idAnimal: '',
		chapeta: '',
		diagnostico: '',
		apta: true,
		sincronizada: true,
		encargado: '',
		observaciones: ''
	};
	this.ajustList = 1;
	this.action === 'new';
	this.indx = this.order.itemList.length;
	
	this.validations_form.reset({
		idAnimal: '',
		chapeta: '',
		diagnostico: '',
		apta: '',
		sincronizada: '',
		encargado: '',
		observaciones: ''
	});
  }
  
  nextItem(){
	if(this.validations_form.valid) {
		if(this.action === 'new') {
			this.order.itemList.push(this.dataItem);
			this.utils.showMessage('Registro agregado');
			this.newItem();
		}
		if(this.action === 'update') {
			let list = [];
			for(let item of this.order.itemList){
				list.push( item.idAnimal === this.dataItem.idAnimal ? this.dataItem :  item);
			}
			this.order.itemList = list;
			this.utils.showMessage('Registro modificado');
			
			if(this.indx === this.order.itemList.length - 1 ){
				this.newItem();
			}
			else {
				this.indx ++;
				this.dataItem = this.order.itemList[this.indx];
			}
		}
		
		this.parentPage.refresItemList(this.order);
	}
  }
  
  backItem() {
	if(this.validations_form.valid) {
		if(this.action === 'new') {
			this.order.itemList.push(this.dataItem);
			this.ajustList = 0;
			this.utils.showMessage('Registro agregado');
		}
		if(this.action === 'update') {
			let list = [];
			for(let item of this.order.itemList){
				list.push( item.idAnimal === this.dataItem.idAnimal ? this.dataItem :  item);
			}
			this.order.itemList = list;
			
			this.utils.showMessage('Registro modificado');
		}
		
		this.parentPage.refresItemList(this.order);
	}
	
	this.indx --;
	this.dataItem = this.order.itemList[this.indx];
	this.action = 'update';
  }

  validation_messages = {
	'idAnimal': [
	  { type: 'required', message: 'Código requerido.' }
	]
  };
  
  ionViewWillLeave() {
	
	if(this.validations_form.valid) {
		if(this.action === 'new') {
			this.order.itemList.push(this.dataItem);
			this.ajustList = 0;
			this.utils.showMessage('Registro agregado');
		}
		if(this.action === 'update') {
			let list = [];
			for(let item of this.order.itemList){
				list.push( item.idAnimal === this.dataItem.idAnimal ? this.dataItem :  item);
			}
			this.order.itemList = list;
			this.utils.showMessage('Registro modificado');
		}
	}
	
    this.parentPage.refresItemList(this.order);
  }
  
}
