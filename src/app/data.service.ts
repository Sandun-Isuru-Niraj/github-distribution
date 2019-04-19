import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUser(access_token: string){
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token
       });
    let options = { headers: headers };

    return this.http.get("https://api.github.com/user", options);
  }

  getAllRepositories(access_token: string, username: string){
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token
       });
    let options = { headers: headers };

    return this.http.get("https://api.github.com/users/" + username + "/repos?per_page=1000", options);
  }
}
