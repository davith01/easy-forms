//---Modules
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { Network } from '@ionic-native/network/ngx';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { File } from '@ionic-native/file/ngx';

//---Modals and pages
import { MyApp } from './app.component';
import { DrawpadPage } from '../pages/drawpad/drawpad';
import { LoginModalForm } from '../pages/login/login-modal-form';
import { HistoryPageModule } from '../pages/history/history.module';

//--- providers
import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import { RestApiProvider } from '../providers/rest-api/rest-api';

//--- components
import { ComponentsModule } from '../components/components.module';
import { UtilsProvider } from '../providers/utils/utils';

@NgModule({
  declarations: [
    MyApp,
    LoginModalForm,
    DrawpadPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
	HistoryPageModule,
	ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginModalForm,
    DrawpadPage
  ],
  providers: [
	File,
    StatusBar,
    SplashScreen,
	Network,
	DocumentViewer,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LocalStorageProvider,
    RestApiProvider,
    FingerprintAIO,
    UtilsProvider
  ]
})
export class AppModule { }
