import { Component } from '@angular/core';
import { Storage } from '@ionic/storage'
import { Stories } from 'src/models/story/story';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-story-view',
  templateUrl: './story-view.page.html',
  styleUrls: ['./story-view.page.scss'],
})
export class StoryViewPage {

  selectedStory: Stories
  email: string;
  uid;
  storyViews;

  constructor(private data: DataService, private navCtrl: NavController, private storage: Storage) {
    this.storage.get('email').then(email => {
      this.email = email;
      this.storage.get(email + 'uid').then(uid => {
        this.uid = uid;
      })
    })
    this.storage.get('selectStory').then(val => {
      this.selectedStory = val;
    })
  }
  goToProfile() {
    this.storage.set('profileMessage', this.selectedStory);
    this.navCtrl.navigateForward('user-profile-page');
  }
  exit() {
    this.storage.get('page').then(val => {
      if (val === 'tab1')
        this.navCtrl.navigateForward('tabs/tab1');
      else
        this.navCtrl.navigateForward('tabs/tab2');
    })

  }

  goToMessage() {
    this.storage.set('profileMessage', this.selectedStory);
    this.navCtrl.navigateForward('message-page')
  }

  async getStoryView() {
    this.navCtrl.navigateForward('story-seen');
  }
}
