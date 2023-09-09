import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductType } from '../models/dto/product-type/product-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  urlBase:string = "http://localhost:8080/product/type"
  constructor(private http:HttpClient) { }

  getProductsType():Observable<ProductType[]>{
    return this.http.get<ProductType[]>(this.urlBase);
  } 

}
