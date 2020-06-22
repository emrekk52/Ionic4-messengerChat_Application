import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { IonicStorageModule } from '@ionic/storage';
import { DataService } from './services/data.service';
import * as firebase from 'firebase';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { FCM } from '@ionic-native/fcm/ngx'
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';


firebase.initializeApp(FIREBASE_CONFIG.firebaseConfig)


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, AngularFirestoreModule, AngularFireStorageModule, IonicModule.forRoot({ backButtonText: 'Geri', backButtonIcon: 'chevron-back-outline' }), IonicStorageModule.forRoot(), AngularFireDatabaseModule, AppRoutingModule, FormsModule, AngularFireAuthModule, AngularFireModule.initializeApp(FIREBASE_CONFIG.firebaseConfig)],
  providers: [
    StatusBar,
    Camera,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    DataService,
    AdMobFree,
    FCM,
    SpeechRecognition

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
