import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userAuth = new EventEmitter<boolean>(false) 

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

  userLogin(data:Login){
    this.http.get(`http://localhost:3000/users?email=${data.email}&passwod=${data.password}`,{ observe:"response"})
    .subscribe((result) => {
     if(result && result.body != ""){
      this.userAuth.emit(true)
      localStorage.setItem('user',JSON.stringify(result.body))
      this.router.navigate(['/'])
     }else{
       this.userAuth.emit(false)
     }
    })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }
}
