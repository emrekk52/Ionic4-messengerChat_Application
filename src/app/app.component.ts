import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private storage: Storage

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.get('login').then((val) => {
        console.log('login durumu ' + val);
        if (val == true) {
          this.storage.get('email').then((story) => {
            if (story == null || story == false) {
              console.log('email giris durumu ' + story);
              this.router.navigateByUrl('edit-profile-page');
            } else
              this.router.navigateByUrl('tabs');
          })
        }
        else
          this.router.navigateByUrl('tabs');
      })
      this.statusBar.styleBlackTranslucent();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
