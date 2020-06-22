import { Component, Output, EventEmitter } from '@angular/core';
import { Account } from '../../models/account/account.interface';
import { Storage } from '@ionic/storage';
import { AuthService } from '../services/auth.service';
import { LoginResponse } from 'src/models/login/login-response.interface';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})



export class RegisterFormComponent {

  @Output() registerStatus: EventEmitter<LoginResponse>

  constructor(private auth: AuthService, private storage: Storage) {
    this.registerStatus = new EventEmitter<LoginResponse>();
  }
  hide = true;


  account = {} as Account;

  async register() {

    try {
      const result = await this.auth.createUserWithEmailAndPassword(this.account);
      this.storage.set(this.account.email + 'pass', this.account.password);
      this.registerStatus.emit(result);
    }
    catch (e) {
      console.error(e);
      this.registerStatus.emit(e);
    }
  }

}
