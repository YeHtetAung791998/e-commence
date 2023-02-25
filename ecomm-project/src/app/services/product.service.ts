import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  addProduct(data:product){
    return this.http.post("http://localhost:3000/products",data)
  }

  getProducts(){
    return this.http.get<product>("http://localhost:3000/products")
  }

  deleteProducts(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }

  getProductById(id:any){
    return this.http.get(`http://localhost:3000/products/${id}`)
  }

  updateProduct(id:any,product:product){
    return this.http.put(`http://localhost:3000/products/${id}`,product)
  }
}
