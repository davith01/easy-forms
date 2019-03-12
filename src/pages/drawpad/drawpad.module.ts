import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DrawpadPage } from './drawpad';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DrawpadPage,
  ],
  imports: [
    IonicPageModule.forChild(DrawpadPage),
	ComponentsModule,
  ],
})
export class DrawpadPageModule {}
