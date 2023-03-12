import { Component, OnInit } from '@angular/core';
import {Login, SignUp} from '../data-type'
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit{
  showLogin:boolean = false;
  constructor(private userService:UserService){}
  ngOnInit(): void {
   this.userService.userAuthReload();
  }

  signUp(data:SignUp){
      this.userService.userSignup(data)
  }

  logIn(data:Login){
       this.userService.userLogin(data)
       this.userService.userAuth.subscribe( result => {
         console.log(result)
       })
  }

  openLogin(){
    this.showLogin=true;
 }

 openSignup(){
   this.showLogin=false;
}

  
}
