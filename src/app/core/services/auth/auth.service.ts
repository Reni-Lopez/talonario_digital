import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../../model/user.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken: string;

  // URL TO LOGIN
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:sign';
  private apiKey = 'AIzaSyAn4Tp_pH3yOtB7n6Sea3BzgH4c8uQJJmE';

  constructor(private http: HttpClient) {
    this.readToken();
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  login(usuario: User) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.url}InWithPassword?key=${this.apiKey}`, authData
    ).pipe(
      map(resp => {
        this.saveToken(resp['idToken']);
        return resp;
      })
    )
  }

  private saveToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }
  readToken() {

    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  islogging(): boolean {

    if (localStorage.getItem('token') != null) {
      return true;
    }
    else {
      return false;
    }

  }
  
}

