import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResult:any;
  constructor(private activatedRoute:ActivatedRoute,private product:ProductService){
   
  }
  ngOnInit(): void {
    const query = this.activatedRoute.snapshot.paramMap.get('query');
    console.log(query)
   query && this.product.searchProducts(query).subscribe( data =>{
          this.searchResult = data;
     })
  }


}
