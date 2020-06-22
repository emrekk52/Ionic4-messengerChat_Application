import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Profile } from 'src/models/profile/profile.interface';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.page.html',
  styleUrls: ['./user-profile-page.page.scss'],
})
export class UserProfilePagePage {

  selectedProfile: Profile
  date;
  status;

  constructor(private storage: Storage, private navCtrl: NavController) {

    this.storage.get('profileMessage').then(resp => {
      this.selectedProfile = resp;
      let tmp = this.selectedProfile.dateOfBirth.toString().split('T');
      this.date = tmp[0];
      if (this.selectedProfile.status === 'online')
        this.status = 'Çevrimiçi';
      else
        this.status = 'Çevrimdışı';
    })


  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.storage.get('profileMessage').then(resp => {
      this.selectedProfile = resp;
    })
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1500);
  }

  fullscreen() {
    this.navCtrl.navigateForward('full-screen');
  }

}
