import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../environments/environment.prod';
import { User } from '../../shared/models/user.model';
import api from './api';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject!: BehaviorSubject<User>;
  public currentUser!: Observable<User>;

  constructor(private http: HttpClient) {
    this.setCurrentUser();
  }

  public get token(): string {
    let currentUser = localStorage.getItem('currentUser');
    let token = currentUser?.slice(1, currentUser.length - 1);
    return token || '';
  }

  public get currentUserValue(): User {
    if (this.currentUserSubject) {
      return this.currentUserSubject.value;
    }
    return this.currentUserSubject;
  }

  private setCurrentUser(): void {
    let currentUser = localStorage.getItem('currentUser');
    if (currentUser !== null) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(currentUser));
      this.currentUser = this.currentUserSubject.asObservable();
    }
  }

  async login(username: string, password: string) {
    const params = new URLSearchParams()
    params.append('username', username);
    params.append('password', password);
    params.append('grant_type', 'password');

    let auth = {
      username: environment.usernameApi,
      password: environment.passwordApi
    };

    let headers = {
      'content-type': 'application/x-www-form-urlencoded'
    };

    return await api.post('/oauth/token', params, { method: 'POST', headers, auth })
      .then((response: any) => {
        let user = response.data;
        localStorage.setItem('currentUser', JSON.stringify(user.access_token));
        this.setCurrentUser();
        this.currentUserSubject.next(user);
        return user;
      })
      .catch((error: Error) => {
        console.log(error.message);
        return null;
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
