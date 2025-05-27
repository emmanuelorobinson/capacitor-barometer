import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../../services/core.service';
import { HubStorageService } from '../../../services/hub-storage.service';
import { UserService } from '../../../services/user.service';
import { ModalController } from '@ionic/angular';
import { HubSettingsService } from '../../../services/hub-settings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardHandlerService } from '../../../services/dashboard-handler.service';
import { BleService } from '../../../services/ble.service';
import { Platform } from '@ionic/angular';
import { SignalrConnectionService } from '../../../services/signalr-connection.service';
import { TelemetryCacheService } from '../../../services/telemetry-cache.service';
import { TranslateService } from '@ngx-translate/core';
import { HelpersProvider } from '../../../providers/helpers';
import { Barometer } from '@ionic-native/barometer/ngx';
import { Motion } from '@ionic-native/motion/ngx';
import { AccelListenerEvent } from '@ionic-native/motion/ngx';
import { OrientationListenerEvent } from '@ionic-native/motion/ngx';

@Component({
  selector: 'app-mobile-dashboard',
  templateUrl: './mobile-dashboard.page.html',
  styleUrls: ['./mobile-dashboard.page.scss'],
})
export class MobileDashboardPage implements OnInit {
  private queryParamsSubscription: any;
  private mobileNavigation: any;
  private playback: any;
  private pressure: number | undefined;
  private presentingElement: any;
  orientation: OrientationListenerEvent | undefined;
  geolocationWatchId: string | undefined;

  latitude: number | undefined;
  longitude: number | undefined;

  constructor(private coreService: CoreService, private hubStorage: HubStorageService, private userService: UserService, private modalCtrl: ModalController, public hubSettings: HubSettingsService, private route: ActivatedRoute, public dashboardHandler: DashboardHandlerService, private bleService: BleService, private platform: Platform, private signalRConnection: SignalrConnectionService, private telemetryCache: TelemetryCacheService, private router: Router, private translator: TranslateService, private helpersProvider: HelpersProvider) {
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      if (params && params['playbackId']) {
        this.playback = {
          id: parseInt(params['playbackId']),
          fromHistory: true
        };
        this.mobileTab?.playbackClicked(this.playback);

      }
    });

    this.mobileNavigation.mobileDashboardPage = this;

    // Barometer plugin - optional for iOS compatibility
    // REMOVED: this.initializeBarometer();

    Motion.addListener('accel', (event: AccelListenerEvent) => {
      console.log('Accel Data:', event);
    });
  }

  async initializeBarometer() {
    try {
      // Consider adding an isAvailable check if desired
      // const availability = await Barometer.isAvailable();
      // if (!availability.available) {
      //   console.warn('Barometer sensor not available on this device.');
      //   return;
      // }

      await Barometer.start(); // Make sure to start the sensor
      console.log('Barometer started successfully');

      // Initialize pressure to a loading or null state
      this.pressure = undefined; // Or null, or a specific loading state

      Barometer.addListener('onPressureChange', (data: { pressure: number }) => { // Add type for data
        console.log('Pressure Data from listener:', data);
        this.pressure = data.pressure;
        // If this is the first reading, you can handle it specially if needed
        // For example, update a loading flag
      });
      console.log('Pressure listener added.');

      // REMOVED THE getPressure() BLOCK

    } catch (error) {
      console.error('Error with Barometer plugin:', error);
      // Handle error, e.g., set a flag that barometer is unavailable
      this.pressure = undefined; // Or some error indicator
    }
  }

  async ngOnInit() {
    this.userService.authNavStatus$.subscribe((authStat: any) => {
      if (authStat) {
        if (!authStat.loggedIn) {
          this.router.navigate([this.c.loginPath]);
        }
      }
    });

    this.dashboardHandler.options = await this.dashboardHandler.initConstructor();
    this.c.log('Handler option mobile', this.dashboardHandler.options.DMSAccessType);

    this.presentingElement = document.querySelector('.ion-page');

    // Barometer plugin - optional for iOS compatibility
    this.initializeBarometer();

    Motion.addListener('accel', (event: AccelListenerEvent) => {
      console.log('Accel Data:', event);
    });
  }
} 