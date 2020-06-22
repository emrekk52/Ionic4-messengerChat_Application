import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DataService } from '../services/data.service';
import { Stories } from 'src/models/story/story';

@Component({
  selector: 'app-camera-story',
  templateUrl: './camera-story.page.html',
  styleUrls: ['./camera-story.page.scss'],
})
export class CameraStoryPage {


  story = {} as Stories;
  image;
  email;


  constructor(private data: DataService, private camera: Camera, private loadCtrl: LoadingController, private alert: AlertController, private navCtrl: NavController, private storage: Storage) {
    this.image = null;

    this.storage.get('myProfile').then(profile => {
      this.story.firstName = profile.firstName;
      this.story.lastName = profile.lastName;
      this.story.status = profile.status;
      this.story.dateOfBirth = profile.dateOfBirth;
      this.story.email = profile.email;
      this.story.imageURL = profile.imageURL;
      this.story.uid = profile.key;
      this.email = profile.email;
    });

    this.storage.get('email').then(val => {
      this.email = val;
    });

    this.getPhoto();
  }

  async getPhoto() {
    const cameraImage = await this.openCamera();
    this.image = 'data:image/jpeg;base64,' + cameraImage;
  }

  async uploadStory() {

    const loading = await this.loadCtrl.create({
      message: 'Hikaye yükleniyor..',
      backdropDismiss: false
    });

    await loading.present();

    firebase.storage().ref('storyImage/' + this.email).putString(this.image, 'data_url').then(async () => {
      firebase.storage().ref().child('storyImage/' + this.email).getDownloadURL().then(async url => {
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
    this.storage.set(this.email + 'storyupload', true);
    this.navCtrl.navigateRoot('/tabs');
  }

  //kamerayı açtırma
  async openCamera() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 800,
      targetWidth: 800,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    return await this.camera.getPicture(options);
  }

  again() {
    this.getPhoto();
  }

}
