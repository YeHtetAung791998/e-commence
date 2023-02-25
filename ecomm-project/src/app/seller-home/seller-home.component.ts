import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
     productList:any;

   constructor(private product:ProductService){}
  ngOnInit(): void {
   this.product.getProducts().subscribe( result =>{
         this.productList= result;
  })
  }


}
