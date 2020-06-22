import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import *as firebase from 'firebase'
import { Storage } from '@ionic/storage'
import { Stories } from 'src/models/story/story';
import { AngularFireDatabase } from '@angular/fire/database'
import { Profile } from 'src/models/profile/profile.interface';
import { AdMobFreeBannerConfig, AdMobFree } from '@ionic-native/admob-free/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  storyList;
  myProfile;
  email;
  profiles;

  constructor(private admobFree: AdMobFree, private database: AngularFireDatabase, private navCtrl: NavController, private storage: Storage) {
    this.storage.get('email').then(email => {
      this.email = email;
      console.log('bu email ' + this.email)
    });
    this.getMyProfile();
  }

  goToProfile() {
    this.navCtrl.navigateForward('profil-page');
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.getMyProfile();
    this.getInterstitialAd();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1500);
  }

  async getMyProfile() {
    await firebase.database().ref('profiles').on('value', data => {
      let tmp = [];
      data.forEach(data => {
        tmp.push({
          dateOfBirth: data.val().dateOfBirth,
          firstName: data.val().firstName,
          lastName: data.val().lastName,
          status: data.val().status,
          email: data.val().email,
          imageURL: data.val().imageURL,
          lastMessage: data.val().lastMessage,
          key: data.val().key
        })
        this.profiles = tmp;
      })
      for (var i = 0; i < this.profiles.length; i++) {
        if (this.profiles[i].email === this.email) {
          this.myProfile = this.profiles[i];
        }
      }
    });
    this.getStories();
  }

  async getStories() {
    await firebase.database().ref('stories').on('value', data => {
      let tmp = [];
      data.forEach(data => {
        tmp.push({
          dateOfBirth: data.val().dateOfBirth,
          firstName: data.val().firstName,
          lastName: data.val().lastName,
          status: data.val().status,
          email: data.val().email,
          imageURL: data.val().imageURL,
          uploadImage: data.val().uploadImage,
          uid: data.val().uid
        })
        this.storyList = tmp;
      })
    })
    this.getInterstitialAd();
  }

  navigateToSearch() {
    this.navCtrl.navigateForward('search-user');
  }

  goToChannelMessage() {
    this.navCtrl.navigateForward('channel-page');
  }

  addStory() {
    this.navCtrl.navigateForward('story-page');
  }

  selectStory(story: Stories) {
    this.database.object('storyseen/' + story.uid + '/' + this.myProfile.key).set(this.myProfile);
    this.storage.set('selectStory', story);
    this.storage.set('page', 'tab2');
    this.navCtrl.navigateForward('story-view');
  }

  goToMessage(profile: Profile) {
    this.storage.set('profileMessage', profile);
    this.navCtrl.navigateForward('message-page');
  }

  getFullProfileList() {
    this.navCtrl.navigateForward('full-user-list');
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
