import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Account } from '../../models/account/account.interface';
import { LoginResponse } from 'src/models/login/login-response.interface';

@Injectable()

export class AuthService {

  constructor(private auth: AngularFireAuth) { }


  getAuthenticatedUser() {
    return this.auth.authState;
  }


  async createUserWithEmailAndPassword(account) {
    try {
      return <LoginResponse>{
        result: await this.auth.auth.createUserWithEmailAndPassword(account.email, account.password)
      }
    } catch (e) {
      return <LoginResponse>{
        error: e
      }
    }
  }



  async signInWithEmailAndPassword(account: Account) {
    try {
      return <LoginResponse>{
        result: await this.auth.auth.signInWithEmailAndPassword(account.email, account.password)
      }
    } catch (e) {
      return <LoginResponse>{
        error: e
      };
    }
  }


}
