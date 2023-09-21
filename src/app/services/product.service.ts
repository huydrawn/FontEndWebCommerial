import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Response } from '../models/response';
import { Observable } from 'rxjs';
import { ProductTypeService } from './product-type.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  base_url = "http://localhost:8080/product"
  infoProduct: InformationProduct[] = [];

  constructor(private http: HttpClient, private toastr: ToastrService, private productTypeService: ProductTypeService) { }

  loadInFomationProducts() {
    this.http.get<InformationProduct[]>(`${this.base_url}/info`).subscribe(res => {
      this.infoProduct = res;
    });

  }
  getInformationDetailProduct(type: string, page: number, offset: number, orderKey: string, orderType: string): Observable<ProductInformation[]> {
    const params = new HttpParams()
      .set('type', type)
      .set('page', page.toString())
      .set('orderKey', orderKey)
      .set('orderType', orderType)
      .set('offset', offset);
    return this.http.get<ProductInformation[]>(`${this.base_url}`, { params: params })
  }
  getInformationDetailProductByID(id: number): Observable<ProductInformation> {
    return this.http.get<ProductInformation>(`${this.base_url}/${id}`)
  }
  getInformationProduct(id: number): Observable<InformationProduct> {
    return this.http.get<InformationProduct>(`${this.base_url}/info/${id}`);
  }
  update(product: ProductInformation) {
    this.http.post<Response>(`${this.base_url}/update`, product).subscribe((res) => {
      this.toastr.success(res.msg, "Success Update Product", { timeOut: 3000 });
      this.loadInfoProduct(product, "update");
    }, error => {
      this.toastr.error(error.error, "Failure Update Product", { timeOut: 3000 });
    });
  }
  private loadInfoProduct(key: any, command: string) {
    if (command == "update") {
      for (let i = 0; i < this.infoProduct.length; i++) {
        if (this.infoProduct[i].id = key.id) {
          this.infoProduct[i].name = key.name!;
          this.infoProduct[i].price = key.price!;
          this.infoProduct[i].inStock = key.inStock!;
          this.infoProduct[i].productType = this.productTypeService.getNameProductTypeById(key.id!);
          break;
        }
      }
    }
    if (command == "delete") {
      for (let i = 0; i < this.infoProduct.length; i++) {
        if (this.infoProduct[i].id = key) {
          this.infoProduct.splice(i, 1);
        }
      }
    }
    if (command == "save") {
      this.getInformationProduct(key).subscribe(res => {
        this.infoProduct.push(res);
      })

    }
  }
  delete(id: number) {
    this.http.delete<Response>(`${this.base_url}/${id}`).subscribe((res) => {
      this.toastr.success(res.msg, "Success Add New Product", { timeOut: 3000 });
      this.loadInfoProduct(id, "delete");
    }, error => {
      this.toastr.error(error.error, "Failure Add New Product", { timeOut: 3000 });
    });
  }
  save(productInformation: ProductInformation) {
    this.http.post<Response>(this.base_url, productInformation).subscribe((res) => {
      this.toastr.success(res.msg, "Success Add New Product", { timeOut: 3000 });
      this.loadInfoProduct(productInformation, "save");
    }, error => {
      this.toastr.error(error.error, "Failure Add New Product", { timeOut: 3000 });
    });
  }
}
export class ProductInformation {
  id: number;
  image: string | undefined;
  name: string | undefined;
  orders: number | undefined;
  idProductType: string | undefined;
  describer: string | undefined;
  gender: string | undefined;
  price: number | undefined;
  inStock: number | undefined;
  details: ProductDetail[] | undefined


  constructor(id: number, image: string,
    name: string,
    idProductType: string,
    describer: string,
    gender: string,
    price: number,
    inStock: number,
    details: ProductDetail[]) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.idProductType = idProductType;
    this.describer = describer;
    this.gender = gender;
    this.price = price;
    this.inStock = inStock;
    this.details = details;
  }
}
export class ProductDetail {
  inStock:number|undefined;
  price:number|undefined;
  image:string|undefined;
  attributes: Attribute[] | undefined
  constructor() { }

}
export class Attribute {
  name: string | undefined;
  value: string | undefined;
  constructor() { }

}

export class InformationProduct {
  id: number;
  name: string;
  image: string;
  productType: string;
  price: number;
  inStock: number;
  orders: number;
  constructor(id: number,
    name: string,
    productType: string,
    price: number,
    image: string,
    inStock: number,
    orders: number) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.productType = productType;
    this.price = price;
    this.inStock = inStock;
    this.orders = orders
  }
}