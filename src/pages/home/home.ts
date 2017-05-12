import { Component } from '@angular/core';
import { NavController,PopoverController} from 'ionic-angular';
import {BusPage} from '../../pages/bus/bus';
import {AvailableRootPage} from '../../pages/available-root/available-root';
import {BusStationPage} from '../../pages/bus-station/bus-station';
import {PopoverPage} from '../../pages/popover/popover';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  busTab =BusPage;
  rootTab= AvailableRootPage;
  stationTab= BusStationPage;

  constructor(public navCtrl: NavController,public popoverCtrl: PopoverController) {
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
}
}
