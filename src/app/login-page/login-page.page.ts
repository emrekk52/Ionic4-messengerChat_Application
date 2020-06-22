import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { LoginResponse } from 'src/models/login/login-response.interface';
import { Storage } from '@ionic/storage';
import { Profile } from 'src/models/profile/profile.interface';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage {


  profile = {} as Profile;
  account = {} as Account;

  constructor(private loadingCtrl: LoadingController, private navCtrl: NavController, private toast: ToastController, private storage: Storage) { }

  async login(event: LoginResponse) {
    console.log(event);
    if (!event.error) {
      (await this.toast.create({
        message: 'Giriş Yapıldı! ',
        duration: 3000
      })).present();



      this.storage.get('durum').then(async (val) => {
        if (val == null || val == false) {
          this.navCtrl.navigateRoot('/edit-profile-page');
        } else {
          this.presentLoadingWithOptions();
          this.storage.get('email').then(async (durum) => {
            this.navCtrl.navigateRoot('tabs');
            (await this.toast.create({
              header: 'Uyarı',
              message: durum + ' olarak giriş yaptınız!',
              duration: 3000,
              position: "bottom"
            })).present();
          })
        }
      })


    } else {
      (await this.toast.create({
        header: 'Uyarı',
        message: event.error.message,
        duration: 3000
      })).present();
    }

  }

  async presentLoadingWithOptions() {
    this.storage.set('login', true);
    const loading = await this.loadingCtrl.create({
      duration: 1000,
      message: 'Giriş Yapılıyor..',
      translucent: true,
      backdropDismiss: false
    });
    await loading.present();
  }


}
