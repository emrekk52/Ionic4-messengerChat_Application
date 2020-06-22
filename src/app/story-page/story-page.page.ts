import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Stories } from 'src/models/story/story';
import *as firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { DataService } from '../services/data.service';
import { LoadingController, AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-story-page',
  templateUrl: './story-page.page.html',
  styleUrls: ['./story-page.page.scss'],
})
export class StoryPagePage {


  image: string;
  story = {} as Stories
  myProfile = [];

  email: string;


  constructor(private navCtrl: NavController, private alert: AlertController, private loadCtrl: LoadingController, private camera: Camera, private storage: Storage, private data: DataService) {
    this.image = null;

    this.storage.get('myProfile').then(profile => {
      this.story.firstName = profile.firstName;
      this.story.lastName = profile.lastName;
      this.story.status = profile.status;
      this.story.dateOfBirth = profile.dateOfBirth;
      this.story.email = profile.email;
      this.story.imageURL = profile.imageURL;
      this.story.uid = profile.key;

    })
  }



  async choosePhoto() {
    const libraryImage = await this.openLibrary();
    this.image = 'data:image/jpeg;base64,' + libraryImage;
  }

  //galeri açtırma
  async openLibrary() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 800,
      targetWidth: 800,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    return await this.camera.getPicture(options);
  }

  async uploadStory() {

    const loading = await this.loadCtrl.create({
      message: 'Hikaye yükleniyor..',
      backdropDismiss: false
    });

    await loading.present();

    firebase.storage().ref('storyImage/' + this.story.email).putString(this.image, 'data_url').then(async () => {
      firebase.storage().ref().child('storyImage/' + this.story.email).getDownloadURL().then(async url => {
        console.log('hikaye urlsi ' + url);
        this.story.uploadImage = url;
        const result = await this.data.addStory(this.story);
        console.log('sonuç ' + result);
        loading.dismiss();
        (await this.alert.create({
          header: 'Uyarı',
          message: 'Hikaye yüklendi!',
          backdropDismiss: false,
          buttons: ['Tamam']
        })).present();
      })
    })
    this.storage.set(this.story.email + 'storyupload', true);
    this.navCtrl.navigateRoot('/tabs');
  }








}
