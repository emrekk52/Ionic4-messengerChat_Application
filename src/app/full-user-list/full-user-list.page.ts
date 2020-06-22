import { Component } from '@angular/core';
import *as firebase from 'firebase'
import { Profile } from 'src/models/profile/profile.interface';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-full-user-list',
  templateUrl: './full-user-list.page.html',
  styleUrls: ['./full-user-list.page.scss'],
})
export class FullUserListPage {

  fullList = [];

  constructor(private storage: Storage, private navCtrl: NavController) {
    this.getFullList();
  }

  getFullList() {
    this.fullList = [];
    firebase.database().ref('profiles').on('value', data => {
      data.forEach(data => {
        this.fullList.push({
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
    })
  }

  goToMessage(profile: Profile) {
    this.storage.set('profileMessage', profile);
    this.navCtrl.navigateForward('message-page');
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.getFullList();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1500);
  }

  goToProfile(profile: Profile) {
    this.storage.set('profileMessage', profile);
    this.navCtrl.navigateForward('user-profile-page');
  }

}
