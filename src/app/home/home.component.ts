import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import {Chart} from 'chart.js';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: object;
  chart = [];

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {

    this.getAuthenticatedUser();
    this.getAllRepositoriesbyUser();
    

  }

  getAllRepositoriesbyUser(){
    
    let access_token = localStorage.getItem('GitHubDistro@access_token');
    let username = localStorage.getItem('GitHubDistro@username');
    this.data.getAllRepositories(access_token, username).subscribe(data => {
      
      var a = [], b = [], prev;
      let technology = [];
      let color = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];
      
      for(var repo in data){
        technology.push(data[repo].language)
      }
    
      technology.sort();

      for ( var i = 0; i < technology.length; i++ ) {
        if ( technology[i] !== prev ) {
            a.push(technology[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = technology[i];
      }

      this.generateChart(b, a, color);
      

    })
    
  }
  generateChart(data: string[], label: string[], color: string[]) {
    this.chart = new Chart('canvas',{
      type: 'doughnut',
      data: {
        datasets: [{
          data: data,
          backgroundColor: color
      }],
  
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: label
      },
      options: {
        legend:{
          position: 'bottom',
          labels: {
            fontColor: '#fff'
          }
        },
        layout: {
          padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
          }
      }
      }
    })

  }

  getAuthenticatedUser(){
    if(localStorage.getItem('GitHubDistro@access_token')){
      this.data.getUser(localStorage.getItem('GitHubDistro@access_token')).subscribe(
        data => {
          this.user = data;
        }
      )
    }
  }

  onLogout(){

    if(localStorage.getItem('GitHubDistro@access_token')){
      localStorage.clear();
    }

    this.router.navigate(['/']);
  }

  // countingTechnologies(data): object{
    

  //   technology = [];
  //   a.forEach((key, i) => technology[key] = b[i]);
  //   return technology;
  // }

}
