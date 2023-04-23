import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice: number | undefined;
  cartData:cart[] | undefined;
  orderMsg:string|undefined;
  constructor(private productService: ProductService,private router:Router){}
  ngOnInit(): void {
    this.productService.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result;
      result.forEach((item:any) => {
        if(item.quantity){
          price += (+item.price* + item?.quantity);
        }  
      })
      this.totalPrice = price + (price/10)+100 - (price/10);
    })
  }

  orderNow(data:{email:string,address:string,contact:string}){
     let user = localStorage.getItem('user');
     let userId = user && JSON.parse(user)[0].id;

     if(this.totalPrice){
      let orderData:order = {
        ...data,
        totalPrice:this.totalPrice,
        userId,
        id:undefined
      }

      this.cartData?.forEach(item =>{
        setTimeout(() => {
          item.id && this.productService.deleteCartItems(item.id)
        }, 700);
          
      })

      this.productService.orderNow(orderData).subscribe( (result) => {
        if(result){
          this.orderMsg = 'Order placed successfully'
          setTimeout(() => {
            this.router.navigate(['/my-orders'])
            this.orderMsg = undefined;
          }, 600);
          
        }
      })
     }
  }

}
