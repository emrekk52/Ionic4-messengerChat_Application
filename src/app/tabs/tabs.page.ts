import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AdMobFreeBannerConfig, AdMobFree } from '@ionic-native/admob-free/ngx';



@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {


  email: string;


  constructor(private admobFree: AdMobFree, private storage: Storage, private afAuth: AngularFireAuth, private database: AngularFireDatabase) {
    this.afAuth.authState.subscribe(auth => {
      console.log('benim uid tabs ' + auth.uid);
      this.storage.get('email').then((val) => {
        this.email = val + "uid";
        console.log('giriş yapılan email tabs ' + this.email);
        this.storage.set(this.email, auth.uid);
      })
    });
    this.statusOnline();
    this.getInterstitialAd();
  }


  statusOnline() {
    this.storage.get('email').then(email => {
      this.storage.get(email + 'uid').then(uid => {
        this.storage.get(email + 'profile').then(profile => {
          profile.status = 'online';
          this.database.object('profiles/+' + uid).set(profile);
        })
      })
    })
  }

  async getInterstitialAd() {
    const interstitial: AdMobFreeBannerConfig = {
      id: 'ca-app-pub-3697059404433805/7445020497',
      isTesting: false,
      autoShow: true,
      overlap: true
    }
    await this.admobFree.interstitial.config(interstitial);
    await this.admobFree.interstitial.prepare();
  }
}
