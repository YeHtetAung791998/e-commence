import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
updateProductMessage:string | undefined;
  productData : any;
  constructor(private product:ProductService,private route:ActivatedRoute){}

  ngOnInit(): void {
     let productId = this.route.snapshot.paramMap.get("id");
     this.product.getProductById(productId).subscribe( data =>{
            this.productData = data;
      })
  }
  submit(data:product){
    
    this.product.updateProduct(this.productData.id,data).subscribe( data =>{

      
      if(data){
         this.updateProductMessage = "update successful"
      }
      setTimeout(() => {
       this.updateProductMessage = undefined;
      }, 3000);
    })
   }
}
