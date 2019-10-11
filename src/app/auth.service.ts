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
      client_id : "52bbdfe302d460b5ad96",
      client_secret: "3bab931bd7c9c39538a71fc2be3b6354a4df2bb9",
      code: accessCode
    }

    return this.http.post('https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token', data, options);
  }
}
