import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private activatedRoute: ActivatedRoute, private product: ProductService) { }
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('productId');
    console.log(id)
    id && this.product.getProductById(id).subscribe(data => {
      this.productData = data;
    })
  }

  handleQuantity(val:string) {
       if(this.productQuantity<20 && val == 'max'){
        this.productQuantity += 1;
       }else if(this.productQuantity>1 && val == 'min'){
        this.productQuantity -=1;
       }
  }

}
