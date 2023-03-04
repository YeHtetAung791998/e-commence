import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
   
  menuType:string = 'default';
  sellerName:string = '';
  searchResult:any;
  search:any;
  constructor(private route:Router,private product:ProductService){}
  ngOnInit(): void {
   this.route.events.subscribe((val:any) => {
   
      if(val.url){
          if(localStorage.getItem('seller') && val.url.includes('seller')){
               
                this.menuType = 'seller'
                if(localStorage.getItem('seller')){
                  let sellerStore = localStorage.getItem('seller');
                  let sellerData = sellerStore && JSON.parse(sellerStore)[0];
                  console.warn(sellerData)
                  this.sellerName = sellerData.name;
                }
          }
          else{
            this.menuType = 'default'
          
          }
      }
   })
  }

    logout(){
      localStorage.removeItem('seller')
      this.route.navigate(['/'])
    }

    searchProduct(query:KeyboardEvent){
         if(query){
          const element=query.target as HTMLInputElement;
          this.product.searchProducts(element.value).subscribe(data => {
            this.searchResult = data
          })
         }
    }

    hideSearch(){
      this.searchResult=undefined;
    }
    submitSearch(value:any){
        this.route.navigate([`search/${value}`])
    }

    redirectToDetails(id:number){
      this.route.navigate([`details/${id}`])
    }

}
