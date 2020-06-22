import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Profile } from 'src/models/profile/profile.interface';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.page.html',
  styleUrls: ['./full-screen.page.scss'],
})
export class FullScreenPage {

  selectProfile: Profile

  constructor(private storage: Storage, private navCtrl: NavController) {
    this.storage.get('profileMessage').then(resp => {
      this.selectProfile = resp;
    })
  }

  back() {
    this.navCtrl.navigateBack('user-profile-page');
  }


}
