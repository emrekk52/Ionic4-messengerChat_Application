import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import *as firebase from 'firebase';
import { Profile } from 'src/models/profile/profile.interface';
import { AngularFireDatabase } from '@angular/fire/database';




@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent {

  toggle: Boolean;
  isim: string;
  image;
  ref;
  email: string;
  uid: string;

  downProfile = [];
  myProfile: Profile;
  password: string;


  constructor(private alert: AlertController, private database: AngularFireDatabase, private afAuth: AngularFireAuth, private navCtrl: NavController, private loadingCtrl: LoadingController, private data: DataService, private auth: AuthService, private storage: Storage) {


    this.profilGirisYap();
    this.storage.get('email').then((val) => {
      this.email = val;
      this.storage.get(val + 'pass').then(pass => {
        this.password = pass;
      });
      this.storage.get(val + 'uid').then(uid => {
        this.uid = uid;
      });
      try {
        const path = 'profilePictures/' + val;
        this.ref = firebase.storage().ref().child(path).getDownloadURL();
        this.ref.then(response => {
          if (response === null)
            this.image = "src/assets/img/profilePicture.png";
          else
            this.image = response;
        })
      } catch (error) {
        this.image = "src/assets/img/profilePicture.png";
        console.error(error);
      }
      this.storage.get(val + 'k').then((isim) => {
        this.isim = isim;
        console.log("adamın adı " + this.isim);
      });


      this.getToName();
    })
  }

  async logout() {
    const loading = await this.loadingCtrl.create({
      message: 'Çıkış yapılıyor..',
      translucent: true,
      backdropDismiss: false
    });
    await loading.present();

    this.cıkısYap();
    this.storage.set('login', false);
    this.navCtrl.navigateRoot('/login-page');
    loading.dismiss();
  }



  statusOffline() {
    this.storage.get(this.email + 'profile').then(profile => {
      profile.status = 'offline';
      this.database.object('profiles/+' + this.uid).set(profile);
    })

  }

  async profilGirisYap() {
    const loading = await this.loadingCtrl.create({
      duration: 400,
      message: 'Profil Yükleniyor..',
      translucent: true,
      backdropDismiss: false
    });
    await loading.present();
  }


  async cıkısYap() {
    this.afAuth.auth.signOut();
    this.statusOffline();
  }

  colorChange() {
    console.log(this.toggle);
  }


  async clearData() {
    (await this.alert.create({
      header: 'Uyarı',
      message: 'Tüm veriler temizlenecek devam etmek istiyor musunuz?',
      buttons: [{
        text: 'Evet', role: 'evet',
        handler: () => {
          this.storage.clear();
          this.navCtrl.navigateRoot('login-page');
        }
      },
      {
        text: 'Hayır', role: 'hayır',
        handler: () => {
          console.log('hayır');
        }
      }
      ]
    })).present();
  }


  async removeProfile() {
    (await this.alert.create({
      header: 'Uyarı',
      message: 'Hesabınız kalıcı olarak silinecektir devam etmek istiyor musunuz?',
      buttons: [{
        text: 'Evet', role: 'evet',
        handler: async () => {
          (await this.alert.create({
            header: 'Lütfen şifrenizi giriniz!',
            inputs: [{
              name: 'passwordd',
              placeholder: 'şifrenizi giriniz..',
              type: 'password'
            }],
            buttons: [{
              text: 'Tamam', role: 'tamam',
              handler: async data => {
                if (this.password === data.passwordd) {
                  firebase.storage().ref('profilePictures/' + this.email).delete();
                  firebase.storage().ref('storyImage/' + this.email).delete();
                  this.database.object('profiles/+' + this.uid).remove();
                  this.database.object('stories/+' + this.uid).remove();
                  this.storage.get('email').then(email => {
                    this.email = email;
                    console.log('bu email ' + this.email)
                    this.storage.set(email + 'storyupload', null);
                  });
                  console.log(firebase.auth().currentUser);
                  firebase.auth().currentUser.delete();
                  (await this.alert.create({
                    header: 'İşlem Başarılı',
                    message: 'Hesabınız kalıcı olarak silinmiştir!',
                    buttons: [{
                      text: 'Tamam', role: 'tamam', handler: () => { this.navCtrl.navigateRoot('login-page'); }
                    }],
                    backdropDismiss: false
                  })).present();

                } else {
                  this.wrongPass();
                }
              }
            }]
          })).present();

        }
      },
      {
        text: 'Hayır', role: 'hayır',
        handler: () => {
          console.log('hayır');
        }
      }
      ]
    })).present();
  }

  async getToName() {
    firebase.database().ref('profiles').on('value', data => {
      let tmp = [];
      data.forEach(data => {
        tmp.push({
          firstName: data.val().firstName,
          lastName: data.val().lastName,
          email: data.val().email,
          imageURL: data.val().imageURL
        })
      })
      for (var i = 0; i < tmp.length; i++) {
        if (this.email === tmp[i].email) {
          this.isim = tmp[i].firstName + ' ' + tmp[i].lastName;
          this.image = tmp[i].imageURL;
          this.storage.set('profilePhoto', this.image);
        }
      }
    });


  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.getToName();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1500);
  }



  async wrongPass() {
    (await this.alert.create({
      header: 'Uyarı',
      message: 'Girilen şifre yanlış',
      buttons: ['Tamam']
    })).present();
  }

  async removeStory() {
    (await this.alert.create({
      header: 'Uyarı!',
      message: 'Hikayeniz kalıcı olarak silinecektir devam etmek istiyor musunuz?',
      backdropDismiss: false,
      buttons: [{
        text: 'Evet', role: 'evet',
        handler: async () => {
          const load = await this.loadingCtrl.create({
            message: 'Hikaye siliniyor..',
            backdropDismiss: false
          });
          load.present();
          firebase.storage().ref('storyImage/' + this.email).delete();
          this.database.object('stories/+' + this.uid).remove();
          load.dismiss();
          (await this.alert.create({
            header: 'İşlem Başarılı!',
            message: 'Hikayeniz başarılı bir şekilde silinmiştir!',
            backdropDismiss: false,
            buttons: ['Tamam']
          })).present();
        }
      }, { text: 'Hayır', role: 'hayır' }]
    })).present();
  }

}

