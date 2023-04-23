import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
 cartData:any;
 priceSummary:priceSummary ={
    price:0,
    discount:0,
    tax:0,
    delivery:0,
    total:0
 };
  constructor(private productService: ProductService,private router:Router){
    
  }

  ngOnInit(): void {
    this.loadDetails();
  }

  private loadDetails() {
    this.productService.currentCart().subscribe((result) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item: any) => {
        if (item.quantity) {
          price += (+item.price * +item?.quantity);
        }

      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 10) + 100 - (price / 10);
    });
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }

  removeToCart(cartId: any){
    cartId && this.productService.removeToCart(cartId).subscribe((result)=>{
      console.log('result is --',result)
      if(result){
        let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user)[0].id;
        this.productService.getCartList(userId)
       this.loadDetails();
      }
     })
  }
}
