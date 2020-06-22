import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.page.html',
  styleUrls: ['./edit-profile-page.page.scss'],
})
export class EditProfilePagePage {

  constructor(private navCtrl: NavController) { }

  saveProfilResult(event: Boolean) {
    event ? this.navCtrl.navigateRoot('/tabs') : console.log('profil kaydedildi');
  }

}
