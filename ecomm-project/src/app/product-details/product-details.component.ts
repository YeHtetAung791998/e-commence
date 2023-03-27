import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: any;
  productQuantity:number = 1;
  quantity:number = 1;
  removeCart = false;
  cartData:product | undefined;
  constructor(private activatedRoute: ActivatedRoute, private product: ProductService) { }
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('productId');
    id && this.product.getProductById(id).subscribe(data => {
      this.productData = data;
    })
    let cartData = localStorage.getItem('localCart');
    if(id && cartData){
      let items = JSON.parse(cartData);
      items = items.filter((item:product) => id == item.id.toString());
      if(items.length){
       
        this.removeCart = true;
      }else{
        this.removeCart = false;
      }
    }
      this.product.cartData.subscribe(data =>{
        console.error(data);
      })
    const user = localStorage.getItem('user');
    if(user){
      const userId = user && JSON.parse(user)[0].id;
      this.product.getCartList(userId)
      this.product.cartData.subscribe((data) =>{
        const item = data.filter((item:product)=>id?.toString()===item.productId?.toString())
        if(item.length){
          this.cartData = item[0];
          this.removeCart = true;
        }
      })
    }
  }

  handleQuantity(val:string) {
       if(this.productQuantity<20 && val == 'max'){
        this.productQuantity += 1;
       }else if(this.productQuantity>1 && val == 'min'){
        this.productQuantity -=1;
       }
  }

  addToCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity;
      if(!localStorage.getItem('user')){
        this.product.localAddToCart(this.productData)
        this.removeCart = true;
      }
      else{
        let user = localStorage.getItem('user');
        
        let userId = user && JSON.parse(user)[0].id;
        const cartData:cart = {
          ...this.productData,
          userId,
          productId:this.productData.id
        }
        delete cartData.id;
        this.product.addToCart(cartData).subscribe(result =>{
         if(result){
          this.product.getCartList(userId)
          this.removeCart = true;
         }
        })
        
      }
    }
  }

  removeToCart(id: number){
    if(!localStorage.getItem('user')){
      this.product.removeItemFromCart(id);
    } else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user)[0].id;
     this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result)=>{
      if(result){
        this.product.getCartList(userId)
       
      }
     })
     this.removeCart = false;
    }
   
  }
}
