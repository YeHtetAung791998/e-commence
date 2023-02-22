import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-type';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent  implements OnInit{
  showLogin:boolean = false;
  authError:string = "";
  constructor( private sellerSvc:SellerService,private router:Router){}
  ngOnInit(): void {
    this.sellerSvc.reloadSeller();
  }
  
  signUp(data:SignUp):void{
     this.sellerSvc.userSignup(data);
  }
  openLogin(){
     this.showLogin=true;
  }

  openSignup(){
    this.showLogin=false;
 }

 logIn(data:Login){
     this.sellerSvc.userLogin(data)
     this.sellerSvc.isLoginError.subscribe((error)=>{
       if(error){
            this.authError = "Email or password is not correct"
       }
     })
 }



}
