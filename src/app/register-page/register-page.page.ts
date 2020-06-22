import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoginResponse } from 'src/models/login/login-response.interface';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.page.html',
  styleUrls: ['./register-page.page.scss'],
})
export class RegisterPagePage {

  constructor(private toast: ToastController) {}


  async register(event: LoginResponse) {
    console.log(event);
    if (!event.error) {
      (await this.toast.create({
        header: 'Uyarı',
        message: 'Hesap Başarıyla Oluşturuldu! ',
        duration: 4000,
        position: 'bottom'
      })).present();
      
    } else {
      (await this.toast.create({
        header: 'Uyarı',
        message: 'Hesap Oluşturulamadı! ' + event.error.message,
        duration: 3000,
        position: 'bottom'
      })).present();
    }

  }


}
