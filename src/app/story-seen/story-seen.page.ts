import { Component } from '@angular/core';
import *as firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { Profile } from 'src/models/profile/profile.interface';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-story-seen',
  templateUrl: './story-seen.page.html',
  styleUrls: ['./story-seen.page.scss'],
})
export class StorySeenPage {

  storySeenList = [];
  selectStory;



  constructor(private navCtrl: NavController, private storage: Storage) {
    this.storage.get('selectStory').then(story => {
      this.selectStory = story;
    })

    this.getToSeenStory();
  }

  async getToSeenStory() {
    this.storage.get('email').then(email => {
      this.storage.get(email + 'uid').then(async uid => {
        await firebase.database().ref('storyseen/' + uid).on('value', data => {
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
              uid: data.val().uid
            })
            this.storySeenList = tmp;
          })
        })
      })
    })

  }

  doRefresh(event) {
    this.getToSeenStory();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1500);
  }

  goToMessage(profil: Profile) {
    this.storage.set('profileMessage', profil);
    this.navCtrl.navigateForward('message-page');
  }

}
