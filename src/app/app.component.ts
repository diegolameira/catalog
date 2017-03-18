import { Component } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';

import { Auth } from '../providers/auth';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, public auth: Auth) {
    this.watch();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

  }

  private watch() {
    this.auth.onAuthChange.subscribe(
      currentUser => {

        if ( currentUser )
          this.rootPage = TabsPage;
        else
          this.rootPage = LoginPage;

      }
    )
  }
}
