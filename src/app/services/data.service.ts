import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, } from '@angular/fire/database';
import { User } from 'firebase/app';
import { Profile } from 'src/models/profile/profile.interface';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';
import { Message } from '../../models/messages/message.interface';
import { Stories } from 'src/models/story/story';
import { Storage } from '@ionic/storage';




@Injectable()

export class DataService {

  profileObject: AngularFireObject<Profile>
  storyObject: AngularFireObject<Stories>
  storyViewObject: AngularFireObject<Stories>
  selectStory;
  storyViews;
  myProfile;



  constructor(private database: AngularFireDatabase, private authService: AuthService, private storage: Storage) { }

  async sendChat(message: Message, gelenurl: string, gelenurl2: string) {
    await this.database.list('messages/' + gelenurl).push(message);
    await this.database.list('messages/' + gelenurl2).push(message);
  }




  searchUser(firstName: string) {
    const query = this.database.list('/profiles').query.orderByChild('firstName').equalTo(firstName);
    return query[1];
  }



  getProfile(user: User) {
    this.profileObject = this.database.object('/profiles/+' + user.uid);
    return this.profileObject[1];
  }


  async saveProfile(user: User, profile: Profile, url: string) {
    this.profileObject = this.database.object('/profiles/+' + user.uid);
    try {
      profile.key = user.uid;
      profile.imageURL = url;
      profile.lastMessage = 'yazışma bulunamadı..';
      profile.status = 'online';
      this.storage.set(profile.email + 'profile', profile);
      await this.profileObject.set(profile);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }


  async addStory(story: Stories) {
    this.storyObject = this.database.object('/stories/+' + story.uid);
    try {
      await this.storyObject.set(story);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }




}
