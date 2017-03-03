import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {BusPage} from '../pages/bus/bus';
import {AvailableRootPage} from '../pages/available-root/available-root';
import {BusStationPage} from '../pages/bus-station/bus-station';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import {TestPage} from '../pages/test/test';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BusPage,
    AvailableRootPage,
    BusStationPage,
    TestPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BusPage,
    AvailableRootPage,
    BusStationPage,
    TestPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
