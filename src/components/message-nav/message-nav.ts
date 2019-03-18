import { Component } from '@angular/core';

/**
 * Generated class for the MessageNavComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'message-nav',
  templateUrl: 'message-nav.html'
})
export class MessageNavComponent {

  text: string;

  constructor() {
    console.log('Hello MessageNavComponent Component');
    this.text = 'Hello World';
  }

}
