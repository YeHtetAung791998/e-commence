import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http:HttpClient,private router:Router) { }

  userSignup(user:SignUp){
    this.http.post("http://localhost:3000/users",user,{ observe:"response"})
    .subscribe((result) => {
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body))
        this.router.navigate(['/'])
       }
    });
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }
}
