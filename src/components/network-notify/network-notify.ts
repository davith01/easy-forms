import { Component } from '@angular/core';

/**
 * Generated class for the NetworkNotifyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'network-notify',
  templateUrl: 'network-notify.html'
})
export class NetworkNotifyComponent {

  text: string;

  constructor() {
    console.log('Hello NetworkNotifyComponent Component');
    this.text = 'Hello World';
  }

}
