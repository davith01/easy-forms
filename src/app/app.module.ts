//---Modules
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SignaturePadModule } from 'angular2-signaturepad';
import { HttpClientModule } from '@angular/common/http';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { Network } from '@ionic-native/network/ngx';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//---Modals and pages
import { MyApp } from './app.component';
import { DrawpadPage } from '../pages/drawpad/drawpad';
import { LoginModalForm } from '../pages/login/login-modal-form';

//--- providers
import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import { RestApiProvider } from '../providers/rest-api/rest-api';
import { NetworkNotifyProvider } from '../providers/network-notify/network-notify';

//--- directives
//import { NetworkNotifyDirective } from '../directives/network-notify/network-notify';
import { ComponentsModule } from '../components/components.module';
//import { NetworkNotifyComponent } from '../components/network-notify/network-notify';


@NgModule({
  declarations: [
    MyApp,
    LoginModalForm,
    DrawpadPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SignaturePadModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
	ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginModalForm,
    DrawpadPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
	Network,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LocalStorageProvider,
    RestApiProvider,
    FingerprintAIO,
    NetworkNotifyProvider
  ]
})
export class AppModule { }
