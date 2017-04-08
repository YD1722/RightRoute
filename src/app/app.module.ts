import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

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

import {FormsModule} from '@angular/forms';
import { Ng2CompleterModule } from "ng2-completer";
import { Routes} from '../providers/routes';
import { Stations} from '../providers/stations';
import {AppService} from '../providers/app';
import {Review} from '../providers/review';

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
    AddReviewPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot(),
    FormsModule,
    Ng2CompleterModule,
    CloudModule.forRoot(cloudSettings)
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
    AddReviewPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Routes,Stations,AppService,Review]
})
export class AppModule {}
