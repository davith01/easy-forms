import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})

export class FormPage {

  dataItem: any = {};
  dataList: any = [];
  
  validations_form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public modal: ModalController) {
	  let data = this.navParams.get('item');
	  this.dataItem = data || {};
	  
	  this.validations_form = this.formBuilder.group({
		idAnimal: new FormControl('', Validators.required),
		chapeta: new FormControl('', Validators.compose([
			Validators.required,
			Validators.maxLength(25),
			Validators.minLength(5)
		])),
		diagnostico: new FormControl('', Validators.required),
		apta: new FormControl(true, Validators.pattern('true')),
		sincronizada: new FormControl(true, Validators.pattern('true'))
	});
  }

  
  

  validation_messages = {
	'idAnimal': [
	  { type: 'required', message: 'Código requerido.' }
	],
    'chapeta': [
      { type: 'required', message: 'chapeta is required.' },
      { type: 'minlength', message: 'chapeta must be at least 5 characters long.' },
      { type: 'maxlength', message: 'chapeta cannot be more than 25 characters long.' }
    ],
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'lastname': [
      { type: 'required', message: 'Last name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'validCountryPhone', message: 'Phone incorrect for the country selected' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions.' }
    ],
  };

  onSubmit(exit: boolean) {
	  this.dataList.push(this.dataItem);
	  this.dataItem.idAnimal = '';
	  //if(exit) this.navCtrl.push('OrderPage',this.dataList);
	   if(exit) this.navCtrl.push('OrderPage',{"order":{},"itemList":this.dataList});
	   
  }
 
}
