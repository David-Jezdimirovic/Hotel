import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.css']
})
export class Navbar2Component implements OnInit {

  public isLogin: boolean;
  public isAdmin: boolean;
public provera:any;
public ime:any[];

  constructor(private _http: Http, private _router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }

    //if(localStorage.getItem('admin') == '1'){
    //  this.isAdmin = true;
    //}else{
    //  this.isAdmin = false;
   // }
this.proveriAdmina();
this.getName();
  }



  public logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    this.isLogin = false;
    location.reload();
  }

  public proveriAdmina(){
    var headers = new Headers(); 
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));
    let data = "token="+localStorage.getItem('token');
    this._http.post('http://localhost:8080/IT255-PZ/proveriAdmina.php', data, {headers:headers}).subscribe( data => {
          this.provera = JSON.parse(data["_body"]).admin;
      //    var r=this.n['admin'];
      //console.log(r);
          if(this.provera['admin'] == 1){
       
           this.isAdmin = true;
          }else{
         
          this.isAdmin = false;
          }
  }, err => {
    alert("neuspeh");
  });
  
  }


  public getName(){
    var headers = new Headers(); 
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));

    this._http.get('http://localhost:8080/IT255-PZ/getName.php?token='+localStorage.getItem('token'), {headers:headers}).subscribe( data => {
          this.ime = JSON.parse(data["_body"]).username;
  }
  , err => {
    alert("neuspeh");
  });

  }



}
