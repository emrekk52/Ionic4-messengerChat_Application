import { Component, EventEmitter, Output } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Account } from '../../models/account/account.interface'
import { LoginResponse } from 'src/models/login/login-response.interface';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {

  hide = true;
  account = {} as Account;

  @Output() loginstatus: EventEmitter<LoginResponse> = new EventEmitter<LoginResponse>();

  constructor(private toast: ToastController, private alert: AlertController, private afAuth: AngularFireAuth, private storage: Storage, private navCtrl: NavController, private auth: AuthService) {
    this.loginstatus = new EventEmitter<LoginResponse>();
  }

  async login() {

    const loginResponse = await this.auth.signInWithEmailAndPassword(this.account);
    this.loginstatus.emit(loginResponse);
    this.storage.get(this.account.email).then((durum) => {
      console.log('bu neyin nesi böyle' + this.account.email);
      this.storage.set('durum', durum);
      this.storage.set('email', this.account.email);
    })
  }

  navigateToRegister() {
    this.navCtrl.navigateForward('/register-page');
  }

  async resetPassword() {
    (await this.alert.create({
      header: "Uyarı",
      message: 'Lütfen şifreyi sıfırlamak istedğiniz e-posta yı giriniz',
      backdropDismiss: false,
      inputs: [{
        name: 'eposta',
        placeholder: 'e-posta giriniz..',
        type: 'email'
      }],
      buttons: [{
        text: 'Sıfırla',
        role: 'sıfırla',
        handler: data => {
          this.afAuth.auth.sendPasswordResetEmail(data.eposta).then(async () => {
            (await this.alert.create({
              header: 'Uyarı',
              message: 'Sıfırlama bağlantısı e-postanıza gönderildi!',
              backdropDismiss: false,
              buttons: ['Tamam']
            })).present();
          }).catch(async e => {
            (await this.toast.create({
              header: 'Uyarı',
              message: e,
              duration: 2000
            })).present();
          });
        }
      }, {
        text: 'İptal',
        role: 'iptal'
      }]
    })).present();
  }

}
