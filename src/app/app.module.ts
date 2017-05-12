import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {IonicStorageModule} from '@ionic/storage';
import {HttpModule} from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';

import { HomePage } from '../pages/home/home';
import {BusPage} from '../pages/bus/bus';
import {AvailableRootPage} from '../pages/available-root/available-root';
import {BusStationPage} from '../pages/bus-station/bus-station';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import {TestPage} from '../pages/test/test';
import {ReviewPage} from '../pages/review/review';
import {StationModalPage} from '../pages/station-modal/station-modal';
import {LoginPage} from '../pages/login/login';
import {AddReviewPage} from '../pages/add-review/add-review';
import { SignupPage} from '../pages/signup/signup';
import {PopoverPage} from '../pages/popover/popover';  

import {FormsModule} from '@angular/forms';
import { Ng2CompleterModule } from "ng2-completer";
import { Routes} from '../providers/routes';
import { Station} from '../providers/station';
import {AppService} from '../providers/app';
import {Review} from '../providers/review';
import{Auth} from '../providers/auth';
import {Location} from '../providers/location'; // is this really needed?

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'e80be179'
  }
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BusPage,
    AvailableRootPage,
    BusStationPage,
    TestPage,
    StationModalPage,
    ReviewPage,
    LoginPage,
    AddReviewPage,
    SignupPage,
    PopoverPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot(),
    FormsModule,
    Ng2CompleterModule,
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BusPage,
    AvailableRootPage,
    BusStationPage,
    TestPage,
    StationModalPage,
    ReviewPage,
    LoginPage,
    AddReviewPage,
    SignupPage,
    PopoverPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Routes,Station,AppService,Review,Auth,Geolocation,Location]
})
export class AppModule {}
