import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-type';
@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLogin = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http:HttpClient,private router:Router) { }

  userSignup(data:SignUp){
      this.http.post("http://localhost:3000/seller",data,{ observe:"response"})
      .subscribe((result) => {
        this.isSellerLogin.next(true)
        localStorage.setItem('seller',JSON.stringify(result.body))
        this.router.navigate(['seller'])
      });
  }

  userLogin(data:Login){
      this.http.get(`http://localhost:3000/seller?email=${data.email}&passwod=${data.password}`,{ observe:"response"})
      .subscribe((result) => {
       if(result && result.body && result.body != ""){
        localStorage.setItem('seller',JSON.stringify(result.body))
        this.router.navigate(['seller'])
       }else{
         console.log("login failed")
         this.isLoginError.emit(true);
       }
      })
  }


  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLogin.next(true)
      this.router.navigate(['seller'])
    }
  }
}
