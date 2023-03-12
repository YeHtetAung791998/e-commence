import { Component, OnInit } from '@angular/core';
import {SignUp} from '../data-type'
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit{

  constructor(private userService:UserService){}
  ngOnInit(): void {
   this.userService.userAuthReload();
  }

  signUp(data:SignUp){
      this.userService.userSignup(data)
  }
}
