import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ConvertService } from 'src/app/services/convert.service';
import { DecodeService } from 'src/app/services/decode.service';
import { ProductDetail, ProductService, ProductInformation } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent {
  product$ = new Observable<ProductInformation>;
  amount: number | null = 1;
  imageProduct: string | undefined;
  maxPrice: number | undefined;
  minPrice: number | undefined;

  index1: {
    attributeIndex: number;
    valueIndex: number
  } | null = null;
  index2: {
    attributeIndex: number;
    valueIndex: number
  } | null = null;
  p: ProductInformation | undefined;
  attributes: { name: string, value: { name: string }[] }[] = [];
  constructor(private _route: ActivatedRoute, private productService: ProductService, private decode: DecodeService, private convert: ConvertService) { }

  ngOnInit(): void {
    let slug = this._route.snapshot.paramMap.get('slug');
    const pieces = slug?.split("-");
    this.product$ = this.productService.getInformationDetailProductByID(parseInt(pieces![1]));


    this.product$.subscribe(res => {
      this.p = res;
      this.p!.image = this.convert.byteToURLFile(this.decode.decodeBase64toByteArray(this.p!.image!));
      this.maxPrice = res.price;
      this.minPrice = res.price;

      var x = this.p!.details!.map((data) => {
        return data.attributes?.map((d) => {
          return d.name;
        })
      })
      for (let i = 0; i < x[0]!.length; i++) {
        var name = x[0]![i];
        this.attributes.push({ name: name!, value: [] })
      }

      for (let i = 0; i < this.p!.details!.length; i++) {
        for (let j = 0; j < this.p!.details![i].attributes!.length; j++) {
          if(this.maxPrice! < this.p!.details![i].price!){
            this.maxPrice! = this.p!.details![i].price!
          }
          if(this.minPrice! > this.p!.details![i].price!){
            this.minPrice! = this.p!.details![i].price!
          }
          for (let k = 0; k < this.attributes.length; k++) {
            if (this.p!.details![i].attributes![j].name == this.attributes[k].name) {
              this.attributes[k].value.push({ name: this.p!.details![i].attributes![j].value! });
            }
          }
        }
      }
      for (let i = 0; i < this.attributes.length; i++) {

        this.attributes[i].value = this.attributes[i].value!.filter((value, index, self) =>
          self.findIndex(item => item.name === value.name) === index
        );
      }
    })

  }
  selected(indexAttribute: number, indexValue: number) {
    if (indexAttribute == 0) {
      if (indexValue == this.index1?.valueIndex && indexAttribute == this.index1?.attributeIndex) return true
    }
    if (indexAttribute == 1) {
      if (indexValue == this.index2?.valueIndex && indexAttribute == this.index2?.attributeIndex) return true
    }
    return false;
  }

  selectedValue(attribute: number, value: number) {

    if (attribute == 0) {
      if (attribute == this.index1?.attributeIndex && value == this.index1?.valueIndex) {
        this.index1 = null;

      }
      else {

        this.index1 = { attributeIndex: attribute, valueIndex: value };

      }
    }
    else {
      if (attribute == this.index2?.attributeIndex && value == this.index2?.valueIndex) {
        this.index2 = null;
      }
      else {
        this.index2 = { attributeIndex: attribute, valueIndex: value };
      }
    }


  }
  getVarient(): { image: string, amount: number } {
    var amount = 0;
    var image = '';
    if (this.index1 && this.index2) {
      for (let i = 0; i < this.p!.details!.length; i++) {
        if (this.p!.details![i].attributes![0].name == this.attributes[this.index1.attributeIndex].name
          &&
          this.p!.details![i].attributes![0].value == this.attributes[this.index1.attributeIndex].value[this.index1.valueIndex].name
          &&
          this.p!.details![i].attributes![1].name == this.attributes[this.index2.attributeIndex].name
          &&
          this.p!.details![i].attributes![1].value == this.attributes[this.index2.attributeIndex].value[this.index2.valueIndex].name
        ) {
          amount = this.p!.details![i].inStock!;
          image = this.convert.byteToURLFile(this.decode.decodeBase64toByteArray(this.p!.details![i].image!))
        }
      }
    }
    else if(this.index1){
      for (let i = 0; i < this.p!.details!.length; i++) {
        if (this.p!.details![i].attributes![0].name == this.attributes[this.index1.attributeIndex].name
          &&
          this.p!.details![i].attributes![0].value == this.attributes[this.index1.attributeIndex].value[this.index1.valueIndex].name
          
        ) {
          amount = this.p!.details![i].inStock!;
          image = this.convert.byteToURLFile(this.decode.decodeBase64toByteArray(this.p!.details![i].image!))
        }
      }
    }
    
    else{
      image = this.p!.image!;
      for (let i = 0; i < this.p!.details!.length; i++) {
        amount += this.p!.details![i].inStock!;
      }
    }
    return { image: image, amount: amount }

  }
  minus() {
    if (this.amount! > 1)
      this.amount!--;
  }
  plus() {
    this.product$.subscribe(res => {
      if (this.amount! < this.getVarient().amount) {
        this.amount!++;
      }
    })
  }

}
