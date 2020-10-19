import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersLoginRegisterService {
  readonly baseURL = 'http://localhost:3000/users';
  constructor( private http: HttpClient) { }

  signUp(user : User){
    return this.http.post(this.baseURL+'/sign-up',user);
  }

  signIn(user : User){
    return this.http.post(this.baseURL+'/sign-in',user);
  }
}
