import { Component } from '@angular/core';
import { Profile } from 'src/models/profile/profile.interface';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { Message } from '../../models/messages/message.interface';
import { DataService } from '../services/data.service';
import * as firebase from 'firebase';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';



@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.page.html',
  styleUrls: ['./message-page.page.scss'],
})
export class MessagePagePage {


  ref;
  ref2;
  name;
  isim;

  lastname;
  getMessageList = []
  selectedProfile: Profile
  userId: string;
  userProfile: Profile;
  content: string;
  gidenUrl: string;
  gidenUrl2: string;
  semail1; semail2; email1; email2;
  email;

  lastMessage;

  profileObject: AngularFireObject<Profile>

  profile = {} as Profile;

  chats = [];

  image;
  Currentime;
  times;



  constructor(private alert: AlertController, private camera: Camera, private navCtrl: NavController, private database: AngularFireDatabase, private loadCtrl: LoadingController, private storage: Storage, private afAuth: AngularFireAuth, private auth: AuthService, private data: DataService) {


    this.ref = firebase.database().ref('messages');
    this.storage.get('email').then((val) => {
      this.email = val;
      val = val + 'k';
      this.storage.get(val).then((isim) => {
        this.isim = isim.split(' ');
        this.name = this.isim[0];
        this.lastname = this.isim[1];
        console.log("adamın soyadı " + this.lastname);
      })
    })
    this.ionViewWillLoad();
    this.Currentime = new Date();
    let time = this.Currentime.toString().split(' ');
    let clock = time[4].split(':');
    this.times = '(' + clock[0] + ':' + clock[1] + ' ' + time[1] + ' ' + time[2] + ' ' + time[3] + ')';
  }


  async ionViewWillLoad() {
    this.storage.get('profileMessage').then((val) => {
      this.selectedProfile = val;
    })

    this.storage.get('email').then((email => {
      console.log('bu email message ' + email);

      this.email = email;

      this.semail1 = this.selectedProfile.email.split('@');
      console.log('ilk ayrılan ' + this.semail1[0]);
      this.semail2 = this.semail1[1].split('.');
      console.log('2. ayrılan ' + this.semail2[0] + this.semail2[1]);

      this.email1 = email.split('@');
      this.email2 = this.email1[1].split('.');

      this.gidenUrl = this.semail1[0] + this.semail2[0] + this.semail2[1] + this.email1[0] + this.email2[0] + this.email2[1];
      this.gidenUrl2 = this.email1[0] + this.email2[0] + this.email2[1] + this.semail1[0] + this.semail2[0] + this.semail2[1];

      const uid = email + 'uid';
      this.storage.get(uid).then(resp => {
        this.userId = resp;
      })
    }))

    //this.auth.getAuthenticatedUser().subscribe(auth => this.userId = auth.uid)

    this.getMessage();
  }


  async sendMessage(content: string) {
    this.Currentime = new Date();
    let time = this.Currentime.toString().split(' ');
    let clock = time[4].split(':');
    this.times = '(' + clock[0] + ':' + clock[1] + ' ' + time[1] + ' ' + time[2] + ' ' + time[3] + ')';

    console.log('seçilen kişinin id si ' + this.selectedProfile.key);
    try {
      const message: Message = {
        userToId: this.selectedProfile.key,
        userToProfile: {
          firstName: this.selectedProfile.firstName,
          lastName: this.selectedProfile.lastName
        },
        userFromProfile: {
          firstName: this.name,
          lastName: this.lastname
        },
        userFromId: this.userId,
        content: content,
        uploadImage: null,
        time: this.times,
        durum: ''

      }
      this.data.sendChat(message, this.gidenUrl, this.gidenUrl2);
      this.getMessage();
      this.content = null;
      this.database.object('mychats/' + this.userId + '/' + this.selectedProfile.key).set(this.selectedProfile);

      console.log(message);
    } catch (e) {
      console.error(e);
    }
  }

  async getMessage() {
    const loading = await this.loadCtrl.create({
      message: 'Mesajlar getiriliyor..',
      translucent: true,
      backdropDismiss: true
    });
    await loading.present();

    let val;
    val = this.email.split('@');
    if (this.semail1[0] == val[0]) {
      this.ref2 = firebase.database().ref('messages/' + this.gidenUrl);
    }
    else {
      this.ref2 = firebase.database().ref('messages/' + this.gidenUrl2);
    }

    this.ref2.on('value', data => {
      let tmp = [];
      data.forEach(data => {
        tmp.push({
          userFromProfile: data.val().userFromProfile,
          userToProfile: data.val().userProfile,
          content: data.val().content,
          uploadImage: data.val().uploadImage,
          time: data.val().time,
          durum: data.val().durum

        })
        this.getMessageList = tmp;
        console.log('mesajlarrrr ' + this.getMessageList);
      })
      for (var i = 0; i < this.getMessageList.length; i++) {
        this.lastMessage = this.getMessageList[i].content;
      }
      if (this.lastMessage === null || this.lastMessage === '') {
        this.lastMessage = 'image';
      }
    });


    this.selectedProfile.lastMessage = this.lastMessage;
    this.database.object('profiles/+' + this.selectedProfile.key).set(this.selectedProfile);
    this.database.object('mychats/' + this.userId + '/' + this.selectedProfile.key).set(this.selectedProfile);

    let path;

    if (this.semail1[0] == val[0]) {
      this.ref2 = firebase.database().ref('messages/' + this.gidenUrl2);
      path = 'messages/' + this.gidenUrl2;
    }
    else {
      this.ref2 = firebase.database().ref('messages/' + this.gidenUrl);
      path = 'messages/' + this.gidenUrl;
    }

    this.ref2.on('value', data => {
      let tmp = [];
      data.forEach(data => {
        tmp.push({
          userFromProfile: data.val().userFromProfile,
          userToProfile: data.val().userProfile,
          content: data.val().content,
          uploadImage: data.val().uploadImage,
          time: data.val().time,
          durum: data.val().durum

        })
      })
      for (var i = 0; i < tmp.length; i++) {
        tmp[i].durum = 'görüldü';
      }
      this.database.object(path).set(tmp);
    });


    loading.dismiss();
  }




  doRefresh(event) {
    console.log('Begin async operation');
    this.getMessage();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1500);
  }


  getToProfile() {
    this.navCtrl.navigateForward('user-profile-page');
  }



  async choosePhoto() {
    const libraryImage = await this.openLibrary();
    this.image = 'data:image/jpeg;base64,' + libraryImage;

    const load = await this.loadCtrl.create({
      message: 'Fotoğraf yükleniyor..',
      backdropDismiss: false
    });

    load.present();
    this.Currentime = new Date();
    let time = this.Currentime.toString().split(' ');
    let clock = time[4].split(':');
    this.times = '(' + clock[0] + ':' + clock[1] + ' ' + time[1] + ' ' + time[2] + ' ' + time[3] + ')';

    let path = Math.floor(Math.random() * 12);
    path = Math.floor(Math.random() * path) + 2;
    path = Math.floor(Math.random() * path) * 4;
    await firebase.storage().ref('messageUploadPhotos/' + path).putString(this.image, 'data_url').then(() => {
      firebase.storage().ref().child('messageUploadPhotos/' + path).getDownloadURL().then(async url => {
        try {
          const message: Message = {
            userToId: this.selectedProfile.key,
            userToProfile: {
              firstName: this.selectedProfile.firstName,
              lastName: this.selectedProfile.lastName
            },
            userFromProfile: {
              firstName: this.name,
              lastName: this.lastname
            },
            userFromId: this.userId,
            content: '',
            uploadImage: url,
            time: this.times,
            durum: ''

          }
          this.data.sendChat(message, this.gidenUrl, this.gidenUrl2);
          this.getMessage();
          load.dismiss();
          (await this.alert.create({
            header: 'Uyarı',
            message: 'Fotoğraf başarılı bir şekilde gönderildi!',
            buttons: ['Tamam']
          })).present();
          console.log(message);
        } catch (e) {
          console.error(e);
        }
      })
    })

  }

  async openLibrary() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 500,
      targetWidth: 500,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    return await this.camera.getPicture(options);
  }

  selectPhoto(url: string) {
    this.storage.set('photoUrl', url);
    this.navCtrl.navigateForward('message-photo-screen');
  }

}
