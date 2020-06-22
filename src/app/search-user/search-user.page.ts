import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage'
import { Profile } from '../../models/profile/profile.interface'
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';



@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.page.html',
  styleUrls: ['./search-user.page.scss'],
})
export class SearchUserPage implements OnInit {


  isRecording = false;

  ref;
  profileList: Profile[];
  searchList = [];
  query: string;
  date;

  constructor(private cd: ChangeDetectorRef, private toast: ToastController, private speechRecognition: SpeechRecognition, private loadCtrl: LoadingController, private database: AngularFireDatabase, private storage: Storage, private navCtrl: NavController) {
    this.ref = firebase.database().ref('profiles');
    this.getProfiles();
  }

  ngOnInit() {
  }


  async getProfile() {
    this.query = "";
    const loading = await this.loadCtrl.create({
      message: 'Profiller getiriliyor..',
      translucent: true,
      backdropDismiss: false
    });
    await loading.present();

    this.ref.on('value', data => {
      let tmp = [];
      data.forEach(data => {
        tmp.push({
          key: data.val().key,
          firstName: data.val().firstName,
          lastName: data.val().lastName,
          email: data.val().email,
          dateOfBirth: data.val().dateOfBirth,
          imageURL: data.val().imageURL,
          status: data.val().status,
          lastMessage: data.val().lastMessage,
        })
        this.searchList = tmp;
      })
      for (var i = 0; i < this.searchList.length; i++) {
        let dat = this.searchList[i].dateOfBirth.split('T');
        this.date = dat[0];
      }
    });
    loading.dismiss();
  }


  selectProfile(profile: Profile) {
    console.log("seçilen uid " + profile.key);
    this.storage.set('profileMessage', profile);
    this.navCtrl.navigateForward('message-page');
  }



  getProfiles() {
    this.ref.on('value', data => {
      let tmp = [];
      data.forEach(data => {
        tmp.push({
          key: data.val().key,
          firstName: data.val().firstName,
          lastName: data.val().lastName,
          email: data.val().email,
          dateOfBirth: data.val().dateOfBirth,
          imageURL: data.val().imageURL,
          status: data.val().status,
          lastMessage: data.val().lastMessage,
        })
        this.profileList = tmp;
      })
      this.storage.set('profilist', this.profileList);
      console.log('profil listesi ' + this.profileList);
    });
  }



  searchUser(query: string) {

    this.searchList = [];
    query = query.toLocaleLowerCase().trim();
    this.storage.get('profilist').then((val) => {

      val.forEach(data => {
        console.log(data.firstName.toLocaleLowerCase())
        if (data.firstName.toLocaleLowerCase() == query || data.lastName.toLocaleLowerCase() == query || data.firstName.toLocaleLowerCase() + ' ' + data.lastName.toLocaleLowerCase() == query) {
          this.searchList.push(data)
        }
      })
    })
  }



  voice() {
    this.checkPermissionVoice();
  }

  checkPermissionVoice() {
    this.speechRecognition.hasPermission().then((permission: boolean) => {
      if (!permission) {
        this.speechRecognition.requestPermission().then(() => {
          this.speechRecognition.hasPermission().then((perm: boolean) => {
            if (perm)
              this.startListening();
          })
        });

      } else {
        this.startListening();
      }
    })
  }




  startListening() {
    this.query = '';
    this.isRecording = true;
    this.speechRecognition.startListening().subscribe(async (matches: string[]) => {
      this.query = '';
      for (var i = 0; i < matches.length; i++) {
        this.query += matches[i];
      }
      this.cd.detectChanges();
      (await this.toast.create({
        message: 'deneme ' + matches[0],
        duration: 1500,
        header: 'Uyarı'
      })).present();
    })

    setTimeout(() => {
      this.stopListening();
    }, 5000);

  }

  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    })
  }




}
