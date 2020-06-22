import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import *as firebase from 'firebase';
import { Storage } from '@ionic/storage'
import { Stories } from 'src/models/story/story';
import { Profile } from 'src/models/profile/profile.interface';
import { AngularFireDatabase } from '@angular/fire/database'
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeBanner } from '@ionic-native/admob-free/ngx'
import { FCM } from '@ionic-native/fcm/ngx';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  email;
  myProfile;
  storyList;
  myChats;
  result;
  stories: Stories
  storyDurum;
  uid;




  constructor(private alert: AlertController, private toast: ToastController, private fcm: FCM, private admobFree: AdMobFree, private database: AngularFireDatabase, private storage: Storage, private navCtrl: NavController) {
    this.storage.get('email').then(email => {
      this.email = email;
      console.log('bu email ' + this.email)
      this.storage.get(email + 'storyupload').then(val => {
        this.storyDurum = val;
      });
      this.storage.get(email + 'uid').then(uid => {
        this.uid = uid;
      })
    });
    this.getMyProfile();
    this.getInterstitialAd();
  }


  ngOnInit() {
    this.fcm.getToken().then(token => {
      console.log('firebase (fcm) token -> ' + token)
    })
  }


  async getStories() {
    this.storyList = null;
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
    this.getChats();
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

  selectStory(story: Stories) {
    this.database.object('storyseen/' + story.uid + '/' + this.myProfile.key).set(this.myProfile);
    this.storage.set('selectStory', story);
    this.storage.set('page', 'tab1');
    this.navCtrl.navigateForward('story-view');
  }


  addStory() {
    this.navCtrl.navigateForward('story-page');
  }

  async getChats() {
    await this.storage.get('email').then(email => {
      this.storage.get(email + 'uid').then(uid => {
        firebase.database().ref('mychats/' + uid).on('value', data => {
          let tmp = [];
          data.forEach(data => {
            tmp.push({
              dateOfBirth: data.val().dateOfBirth,
              firstName: data.val().firstName,
              lastName: data.val().lastName,
              status: data.val().status,
              email: data.val().email,
              imageURL: data.val().imageURL,
              lastMessage: data.val().lastMessage
            })
            this.myChats = tmp;
          })
        });
      })
    })
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
      })
      for (var i = 0; i < tmp.length; i++) {
        if (tmp[i].email === this.email) {
          this.myProfile = tmp[i];
          this.storage.set('myProfile', tmp[i])
        }
      }
    });
    this.getStories();
  }

  goToMessage(chat: Profile) {
    this.storage.set('profileMessage', chat);
    this.navCtrl.navigateForward('message-page');
  }

  navigateToSearch() {
    this.navCtrl.navigateForward('search-user');
  }

  addStoryCamera() {
    this.navCtrl.navigateForward('camera-story');
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

  async deleteMessage(chat: Profile) {
    (await this.alert.create({
      header: 'Uyarı',
      buttons: [{
        text: 'Sil',
        role: 'sil',
        handler: async () => {
          this.database.object('mychats/' + this.uid + '/' + chat.key).remove();
          (await this.toast.create({
            header: 'Uyarı',
            message: 'Sohbet silinmiştir!',
            duration: 1000
          })).present();
        }
      }]
    })).present();
  }

  async warnMessage() {
    (await this.toast.create({
      header: 'Uyarı!',
      message: 'Bu butonun görevi bulunmamaktadır!',
      duration: 1000
    })).present();
  }

}
