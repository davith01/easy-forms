import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DrawpadPage } from './drawpad';

@NgModule({
  declarations: [
    DrawpadPage,
  ],
  imports: [
    IonicPageModule.forChild(DrawpadPage),
  ],
})
export class DrawpadPageModule {}
