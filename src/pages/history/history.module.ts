import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryPage } from './history';
import { HistoryTemplate } from './history-template';

@NgModule({
  declarations: [
    HistoryPage,
	HistoryTemplate
  ],
  imports: [
    IonicPageModule.forChild(HistoryPage),
  ],
  exports: [HistoryTemplate]
})
export class HistoryPageModule {}
