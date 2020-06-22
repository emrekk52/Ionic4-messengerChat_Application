import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';



@Component({
  selector: 'app-channel-page',
  templateUrl: './channel-page.page.html',
  styleUrls: ['./channel-page.page.scss'],
})
export class ChannelPagePage {

  ref;
  name;
  newmessage;
  messagesList = [];
  time;
  Currentime;
  image;
  url;
  email;
  imagePhoto;



  constructor(private loadCtrl: LoadingController, private camera: Camera, private alert: AlertController, private storage: Storage, private toast: ToastController) {
    this.messagesList = [];
    this.ref = firebase.database().ref('channelMessage');
    this.storage.get('email').then((val) => {
      this.email = val;
      val = val + 'k';
      this.storage.get(val).then((isim) => {
        this.name = isim;
        console.log("adamın adı " + this.name);
      })




    })
    this.url = null;
    this.newmessage = null;
    this.Currentime = new Date();


    let time = this.Currentime.toString().split(' ');
    let clock = time[4].split(':');
    this.time = '(' + clock[0] + ':' + clock[1] + ' ' + time[1] + ' ' + time[2] + ' ' + time[3] + ')';


    this.getChannelMessage();
  }





  async choosePhoto() {
    const libraryImage = await this.openLibrary();
    this.image = 'data:image/jpeg;base64,' + libraryImage;

    const load = await this.loadCtrl.create({
      message: 'Fotoğraf yükleniyor..',
      backdropDismiss: false
    });

    load.present();

    let time = this.Currentime.toString().split(' ');
    let clock = time[4].split(':');
    this.time = '(' + clock[0] + ':' + clock[1] + ' ' + time[1] + ' ' + time[2] + ' ' + time[3] + ')';

    let path = Math.floor(Math.random() * 154);
    path = Math.floor(Math.random() * path) + path;

    await firebase.storage().ref('channelMessagePhoto/' + path).putString(this.image, 'data_url').then(() => {
      firebase.storage().ref().child('channelMessagePhoto/' + path).getDownloadURL().then(async url => {
        this.url = url;
        this.ref.push({
          name: this.name,
          message: this.newmessage,
          time: this.time,
          uploadPhoto: url,
          imagePhoto: this.imagePhoto
        });

        load.dismiss();

        (await this.alert.create({
          header: 'İşlem Başarılı',
          message: 'Fotoğraf başarılı bir şekilde iletildi!',
          buttons: ['Tamam']
        })).present();
      })
    })


  }




  async doRefresh(event) {
    console.log('Begin async operation');
    this.getChannelMessage();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
    (await this.toast.create({

      message: 'Mesajlar güncellendi..',
      duration: 500,
      position: 'bottom'
    })).present();
  }


  async getChannelMessage() {
    this.messagesList = [];
    this.ref.on('value', data => {
      let tmp = [];
      data.forEach(data => {
        tmp.push({
          key: data.val().key,
          name: data.val().name,
          message: data.val().message,
          time: data.val().time,
          uploadPhoto: data.val().uploadPhoto,
          imagePhoto: data.val().imagePhoto
        })
      });
      this.messagesList = tmp;
      console.log("message listesi " + this.messagesList);
    });
  }

  async send() {
    firebase.storage().ref().child('profilePictures/' + this.email).getDownloadURL().then(photo => {
      this.imagePhoto = photo;
      console.log('profil urlsi ' + this.imagePhoto);

      let time = this.Currentime.toString().split(' ');
      let clock = time[4].split(':');
      this.time = '(' + clock[0] + ':' + clock[1] + ' ' + time[1] + ' ' + time[2] + ' ' + time[3] + ')';

      this.ref.push({
        name: this.name,
        message: this.newmessage,
        time: this.time,
        imagePhoto: this.imagePhoto
      });
      this.newmessage = null;
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





}
