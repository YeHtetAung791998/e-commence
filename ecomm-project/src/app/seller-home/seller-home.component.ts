import { Component, OnInit } from '@angular/core';
import { FaStackItemSizeDirective } from '@fortawesome/angular-fontawesome';
import { faCoffee, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
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
     productMessage:string | undefined; 
     icon =faTrash;
     editIcon = faEdit;
   constructor(private product:ProductService){}
  ngOnInit(): void {
   this.getProduct();
  }

  private getProduct() {
    this.product.getProducts().subscribe(result => {
      this.productList = result;
    });
  }

  deleteProduct(id:number){
   this.product.deleteProducts(id).subscribe( result =>{
      if(result){
         this.productMessage = "item is deleted successfully"
      }
      this.getProduct();
   })
   setTimeout(() => {
     this.productMessage = undefined;
   }, 3000);
  }


}
