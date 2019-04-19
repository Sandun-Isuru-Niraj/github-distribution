import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { Observable, from } from 'rxjs';


@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  code: string;
  
  constructor(private router: Router, private route: ActivatedRoute, private auth: AuthService, private data: DataService) { 
    this.route.queryParamMap.subscribe(params => {

      this.code = params.get("code");

    })
  }

  ngOnInit() {
    this.auth.getAccessToken(this.code).subscribe(
      data => {
        let access_token = data["access_token"]
        if(access_token !== ""){
          localStorage.setItem("GitHubDistro@access_token", access_token);
          this.data.getUser(access_token).subscribe(data => {
          localStorage.setItem("GitHubDistro@username", data["login"]);
          localStorage.setItem("GitHubDistro@name", data["name"]);
          localStorage.setItem("GitHubDistro@email", data["email"]);
          this.router.navigate(['/home']);
          })
          
        }else{
          this.router.navigate(['/']);
        }
      }
    )
  }

}
