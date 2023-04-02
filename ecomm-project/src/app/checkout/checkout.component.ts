import { Component, OnInit } from '@angular/core';
import { order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice: number | undefined;
  constructor(private productService: ProductService){}
  ngOnInit(): void {
    this.productService.currentCart().subscribe((result) => {
      console.log(result)
      let price = 0;
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
        userId
      }
      this.productService.orderNow(orderData).subscribe( (result) => {
        if(result){
          alert('Order placed successfully')
        }
      })
     }
  }

}
