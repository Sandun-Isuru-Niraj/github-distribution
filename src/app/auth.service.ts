import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getAccessToken(accessCode){

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json' });
    let options = { headers: headers };

    let data = {
      client_id : "GITHUB CLIENT ID",
      client_secret: "GITHUB CLIENT SECRET",
      code: accessCode
    }

    return this.http.post('https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token', data, options);
  }
}
