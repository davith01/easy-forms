//---Modules
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SignaturePadModule } from 'angular2-signaturepad';
import { HttpClientModule } from '@angular/common/http';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//---Modals and pages
import { MyApp } from './app.component';
import { DrawpadPage } from '../pages/drawpad/drawpad';
import { LoginModalForm } from '../pages/login/login-modal-form';

//--- providers
import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import { RestProvider } from '../providers/rest/rest';
import { NetworkProvider } from '../providers/network/network';

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
    HttpClientModule
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
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LocalStorageProvider,
    RestProvider,
    FingerprintAIO,
    NetworkProvider
  ]
})
export class AppModule { }
