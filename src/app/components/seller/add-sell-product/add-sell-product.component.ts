import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConvertService } from 'src/app/services/convert.service';
import { DecodeService } from 'src/app/services/decode.service';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { ProductDetail, ProductInformation, ProductService, Attribute } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-sell-product',
  templateUrl: './add-sell-product.component.html',
  styleUrls: ['./add-sell-product.component.css']
})
export class AddSellProductComponent implements OnInit {
  @ViewChild('describer') describer: ElementRef | undefined;
  imageProductURL: string | any;
  imageProduct: File | any;
  name: string | undefined;
  idProductType: string | undefined;
  describerProduct: string | undefined;
  gender: string | undefined;
  productTypes: any = [];
  genders: any = [];
  showAddProductType: boolean = false;
  price: number | undefined;
  inStock: number | undefined;
  groupProduct: { price: number, inStock: number, image: File, attributes: { name: string, value: string }[] }[] = [];
  imageGroupProduct:string[] = [];
  attributes: { name: string, value: { name: string }[] }[] = []

  reset() {

  }

  constructor(public productTypeService: ProductTypeService, private productService: ProductService, private decode: DecodeService, public convert: ConvertService) { }
  ngOnInit(): void {
    this.productTypeService.getAllNameAndId().subscribe((res) => {
      this.productTypes = res;
      this.idProductType = res[0].id;
    })
    this.productTypeService.getGenders().subscribe((res) => {
      this.genders = res;
      this.gender = (res as string[])[0];
    })

  }
  setCursorToStart(event: MouseEvent) {
    // Ngăn sự kiện click lan ra ngoài để tránh mất focus
    event.stopPropagation();

    // Truy cập và tương tác với phần tử <textarea>
    const textareaElement: HTMLTextAreaElement = this.describer!.nativeElement;

    // Đặt vị trí con trỏ ở đầu văn bản
    textareaElement.selectionStart = 0;
    textareaElement.selectionEnd = 0;

    // Focus vào textarea
    textareaElement.focus();
  }


  deleteImage() {
    this.imageProduct = new File([], '', { type: 'text/plain' });
    this.imageProductURL = null;
  }
  deleteImageGroup(i:number){
    this.groupProduct[i].image=new File([], '', { type: 'text/plain' });
  }
  selectFileForImageProduct(event: any) {
    this.imageProduct = this.onFileSelected(event);
    this.imageProductURL = this.convert.fileToURLFile(this.onFileSelected(event));
  }

  selectFileForGroupProduct(event: any, indexGroup: number) {
    this.groupProduct[indexGroup].image = this.onFileSelected(event);
    this.imageGroupProduct[indexGroup] = this.convert.fileToURLFile(this.groupProduct[indexGroup].image);
    console.log(this.imageGroupProduct[indexGroup] )
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      return file;
    }
    return '';
  }
  loadProduct() {
    this.groupProduct = [];
    if (this.attributes.length == 1) {
      for (let i = 0; i < this.attributes[0].value.length; i++) {
        this.groupProduct.push({ price: 0, inStock: 0, image: new File([], '', { type: 'text/plain' }), attributes: [{ name: this.attributes[0].name, value: this.attributes[0].value[i].name }] })
      }
    }
    else {
     
      for (let i = 0; i < this.attributes[0].value.length; i++) {
        for (let j = 0; j < this.attributes[1].value.length; j++) {
        
          this.groupProduct.push({ price: 0, inStock: 0, image: new File([], '', { type: 'text/plain' }), attributes: [{ name: this.attributes[0].name, value: this.attributes[0].value[i].name }, { name: this.attributes[1].name, value: this.attributes[1].value[j].name }] })
          this.imageGroupProduct.push("");
        }
      }

    }
  

  }
  addAtrribute() {
    this.attributes.push({ name: "", value: [{ name: "" }] })
    
    this.loadProduct();
  }
  addValueAtrribute(index: number) {
    this.attributes[index]!.value.push({ name: "" })
    this.loadProduct();
  }

  deleteValueAtrribute(indexAttribute: number, indexValue: number) {
    if (indexValue == 0 && this.attributes[indexAttribute].value.length == 1) this.attributes.splice(indexAttribute, 1);
    else
      this.attributes[indexAttribute].value.splice(indexAttribute, 1);
    this.loadProduct();
  }
  cancelAttribute(index: number) {
    this.attributes.splice(index, 1);
    this.loadProduct();
  }
  AddGroupProduct() {
    this.groupProduct.push({ price: 0, inStock: 0, image: new File([], '', { type: 'text/plain' }), attributes: [{ name: "", value: "" }] })
  }
  applyForAllGroup() {
    for (let i = 0; i < this.groupProduct.length; i++) {
      this.groupProduct[i].inStock = this.inStock!;
      this.groupProduct[i].price = this.price!;
    }
  }

  onProductTypeSelectionChange(event: any) {

    this.idProductType = event.target.value;

  }
  onGenderSelectionChange(event: any) {

    this.gender = event.target.value;
  }
  onDescriberProductTypeSelectionChange(event: any) {
    this.describerProduct = event.target.value;
  }

  canSave(): boolean {
    if (!this.imageProduct) {

      return false
    }
    if (!this.name) {

      return false
    }
    if (!this.idProductType) {
      return false;
    }
    if (!this.describerProduct && this.describerProduct == '') {

      return false;
    }
    if (!this.gender) {

      return false;
    }
    if (this.groupProduct.length > 0) {

      for (let i = 0; i < this.groupProduct.length; i++) {
        if (!this.groupProduct[i].image || !this.groupProduct[i].inStock || !this.groupProduct[i].price)
          for (let j = 0; j < this.groupProduct[i].attributes.length; j++) {
            const check = this.groupProduct[i].attributes[j];
            if (!check.value || !check.name) return false;
          }
      }
    }
    else {

      if (!this.inStock || !this.price) return false;
    }
    return true;
  }
  async saveProduct() {
    const attributes: Attribute[] = [];
    const details: ProductDetail[] = [];

    const update: ProductInformation = new ProductInformation(0, "", this.name!, this.idProductType!, this.describerProduct!, this.gender!, this.price!, this.inStock!, []);

    update.image = await this.decode.encodeFileToBase64s(this.imageProduct).then((res) => {
      return (res as string).split(',')[1];
    })
    for (let i = 0; i < this.groupProduct.length; i++) {
      var detail: ProductDetail = new ProductDetail();
      detail.inStock = this.groupProduct[i].inStock;
      detail.price = this.groupProduct[i].price;
      detail.image = await this.decode.encodeFileToBase64s(this.groupProduct[i].image).then((res) => {
        return (res as string).split(',')[1];
      })
      detail.attributes = [];
      for (let j = 0; j < this.groupProduct[i].attributes.length; j++) {
        const add = this.groupProduct[i].attributes[j];
        var variant = new Attribute();
        variant.name = add.name;
        variant.value = add.value;
        detail.attributes.push(variant);
      }
      update.details!.push(detail);
    }
    
    this.productService.save(update);
    this.reset();
  }
}

