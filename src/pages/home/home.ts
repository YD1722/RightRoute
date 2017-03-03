import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {BusPage} from '../../pages/bus/bus';
import {AvailableRootPage} from '../../pages/available-root/available-root';
import {BusStationPage} from '../../pages/bus-station/bus-station';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  busTab =BusPage;
  rootTab= AvailableRootPage;
  stationTab= BusStationPage;

  constructor(public navCtrl: NavController) {

  }

}
