import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-message-photo-screen',
  templateUrl: './message-photo-screen.page.html',
  styleUrls: ['./message-photo-screen.page.scss'],
})
export class MessagePhotoScreenPage {

  photo;

  constructor(private storage: Storage) {
    this.storage.get('photoUrl').then(photo => {
      this.photo = photo;
    })

  }



}
