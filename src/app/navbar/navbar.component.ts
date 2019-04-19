import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from  '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  authenticated: boolean = false;
  authenticatedUser: string;

  ngOnInit() {
  
    this.activatedRoute.params.subscribe (res => {
      this.evaluateLogin();
   })

    
  }

  evaluateLogin(){
    if(localStorage.getItem('GitHubDistro@access_token')){
      this.authenticated = true
      this.authenticatedUser = localStorage.getItem('GitHubDistro@name')
    }
  }

}
