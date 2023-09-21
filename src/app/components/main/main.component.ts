import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SinginComponent } from '../singin/singin.component';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { DecodeService } from 'src/app/services/decode.service';
import { ConvertService } from 'src/app/services/convert.service';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { TimmerService } from 'src/app/services/timmer.service';
import { InformationProduct, ProductDetail, ProductInformation, ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  link:string="product/test"
  datas:{path:string,product:ProductInformation}[] = [];
  productTypeURLImage:string[]=[];
  constructor(private timmer: TimmerService,private productService : ProductService ,public decode: DecodeService, public convert: ConvertService, public producTypeService: ProductTypeService) {
   
  }
  getProductTypeImages(index:number){
    
    return this.productTypeURLImage[index];
  }
  ngOnInit(): void {
    this.productService.getInformationDetailProduct("",0 , 12,"","").subscribe(res=>{
      for(let i = 0 ; i <  res.length ; i++){
        const path  = "/product/"+res[i].name+"-"+res[i].id
        const product = res[i];
        product.image = this.convert.byteToURLFile(this.decode.decodeBase64toByteArray(product.image!))
        this.datas.push({path:path,product})
      }
      const productTypes = this.producTypeService.getProductsType()
      for(let i = 0 ; i < productTypes.length ; i++){
        this.productTypeURLImage.push(this.convert.byteToURLFile(this.decode.decodeBase64toByteArray(productTypes[i].image)))
      }

    }); 
  }
}
