import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ProductType } from '../models/dto/product-type/product-type';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  urlBase: string = "http://localhost:8080/product/type"
  load() {
    this.http.get<ProductType[]>(this.urlBase).subscribe((res=>{
      this.productTypes = res
    }));
  }
  productTypes: ProductType[] = [];
  constructor(private http: HttpClient) { }
 getNameProductTypeById(id:number):string{
  for (let index = 0; index < this.productTypes.length; index++) {
    if(this.productTypes[index].id == id){
      return this.productTypes[index].name;
      break;
    }
    
  }
  return '';
 }
   getProductsType():ProductType[] {
    
      return this.productTypes;
  }

  getAllNameAndId() {
    return this.http.get<any>(`${this.urlBase}/names`)
      .pipe(
        map(data => {

          const result: { name: string, id: string }[] = [];
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              const array = data[key] as { name: string, id: string }[];
              array.forEach((res) => {
                result.push(res);
              }
              )
            }
          }
          return result;
        })
      )
  }
  getGenders() {
    return this.http.get<any>(`${this.urlBase}/gender`)
      .pipe(
        map(data => {
          const result: [] = [];
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              const array = data[key] as [];
              array.forEach((res) => {
                result.push(res);
              }
              )
            }
          }
          return result;
        })
      )
  }


}
