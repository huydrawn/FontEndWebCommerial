import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SinginComponent } from '../singin/singin.component';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { DecodeService } from 'src/app/services/decode.service';
import { ConvertService } from 'src/app/services/convert.service';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { TimmerService } from 'src/app/services/timmer.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit {
  productsType: { id: number; name: string; url: string }[] = [];


  constructor(private timmer:TimmerService, private decode: DecodeService, private convert: ConvertService, private producTpeService: ProductTypeService) {

  }
  ngAfterViewInit(): void {
    this.producTpeService.getProductsType().subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        const id = res[i].id;
        const name = res[i].name;
        const url = URL.createObjectURL(this.convert.byteToBlob(this.decode.decodeBase64toByteArray(res[i].image)))
        this.productsType.push({ id, name, url })
      }
    }, (error) => {

    }

    )
  }
}
