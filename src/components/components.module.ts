import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LoginFormComponent } from 'src/app/login-form/login-form.component';
import { RegisterFormComponent } from "src/app/register-form/register-form.component";
import { AngularFireModule } from '@angular/fire';
import { FormsModule } from '@angular/forms';
import { FIREBASE_CONFIG } from 'src/app/app.firebase.config';
import { EditProfileFormComponent } from 'src/app/edit-profile-form/edit-profile-form.component';

import { IonicStorageModule } from '@ionic/storage';
import { ProfileViewComponent } from 'src/app/profile-view/profile-view.component';



@NgModule({
    declarations: [
        LoginFormComponent,
        RegisterFormComponent,
        EditProfileFormComponent,
        ProfileViewComponent
    ],
    imports: [IonicModule, AngularFireModule.initializeApp(FIREBASE_CONFIG), FormsModule, IonicStorageModule],
    exports: [
        LoginFormComponent,
        RegisterFormComponent,
        EditProfileFormComponent,
        ProfileViewComponent
    ]
})

export class ComponentsModule {

}