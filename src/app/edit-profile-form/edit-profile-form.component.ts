import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Profile } from 'src/models/profile/profile.interface';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'firebase';
import { Storage } from '@ionic/storage';
import { ToastController, NavController, LoadingController, AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import *as firebase from 'firebase';



@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.scss'],
})
export class EditProfileFormComponent implements OnDestroy {

  image = 'https://www.kasterencultuur.nl/editor/placeholder.jpg';
  imagePath: string;
  upload: any;

  private authenticatedUser$: Subscription;
  private authenticatedUser: User;

  @Output() saveProfilResult: EventEmitter<Boolean>;

  profile = {} as Profile;

  constructor(private loadCtrl: LoadingController, private alert: AlertController, private camera: Camera, private storage: Storage, private auth: AuthService, private data: DataService, private toast: ToastController, private navCtrl: NavController) {
    this.saveProfilResult = new EventEmitter<Boolean>();
    this.authenticatedUser$ = this.auth.getAuthenticatedUser().subscribe((user: User) => {
      this.authenticatedUser = user;
    });

  }
  ngOnDestroy(): void {
    this.authenticatedUser$.unsubscribe();
  }

  async saveProfile() {
    if (this.profile.firstName === null && this.profile.lastName === null && this.profile.dateOfBirth === null && this.imagePath === null) {
      (await this.alert.create({
        header: 'Uyarı',
        message: 'Tüm alanları doldurunuz!',
        backdropDismiss: false,
        buttons: ['Tamam']
      })).present();
    } else {
      this.uploadPhotoFireabase();
    }
  }

  async uploadPhotoFireabase() {
    const loading = await this.loadCtrl.create({
      message: 'Fotoğraf yükleniyor..',
      backdropDismiss: false
    });
    await loading.present();

    this.storage.get('email').then(val => {
      this.imagePath = 'profilePictures/' + val;
      this.upload = firebase.storage().ref(this.imagePath).putString(this.image, 'data_url');
      this.upload.then(async () => {
        if (this.authenticatedUser) {
          console.log(this.authenticatedUser.email)
          this.profile.email = this.authenticatedUser.email;
          firebase.storage().ref().child(this.imagePath).getDownloadURL().then(async response => {
            this.profile.imageURL = response;
            console.log("kaydedilen fotoğraf url si " + this.profile.imageURL);
            this.storage.set(this.profile.email, true);
            const result = await this.data.saveProfile(this.authenticatedUser, this.profile, response);
            console.log(result);
            this.saveProfilResult.emit(result);
          })

          this.storage.set(this.profile.email + 'k', this.profile.firstName + ' ' + this.profile.lastName);
          this.storage.set('email', this.profile.email);
          this.storage.set('login', true);
          this.storage.set('dtarih', this.profile.dateOfBirth);
        }
        await loading.dismiss();
        const alert = await this.alert.create({
          header: 'Uyarı',
          message: 'Profil tamamlandı!',
          buttons: ['Tamam'],
          backdropDismiss: false
        });

        await alert.present();
      })
    });



  }


  async addPhoto(source: string) {
    if (source === 'library') {
      const libraryImage = await this.openLibrary();
      this.image = 'data:image/jpeg;base64,' + libraryImage;
    }
    else {
      const cameraImage = await this.openCamera();
      this.image = 'data:image/jpeg;base64,' + cameraImage;
    }

  }


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

}
