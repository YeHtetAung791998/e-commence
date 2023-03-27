import { Component, OnInit } from '@angular/core';
import { cart, Login, product, SignUp } from '../data-type'
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = false;
  authErr = "";
  constructor(private userService: UserService, private product: ProductService) { }
  ngOnInit(): void {
    this.userService.userAuthReload();
  }

  signUp(data: SignUp) {
    this.userService.userSignup(data)
  }

  logIn(data: Login) {
    this.userService.userLogin(data)
    this.userService.userAuth.subscribe(result => {
      console.log('result', result)
      if (result) {
        this.authErr = "User not logged in"
      } else {
        this.localCartToRemoteCart()
      }
    })
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignup() {
    this.showLogin = false;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user)[0].id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);


      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        }

        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe(data => {
            if (data) {
              console.warn("Item stored in DB")
            }
          })
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);

      });
    }

    setTimeout(() => {
      this.product.getCartList(userId)
    },2000)
  }

}
