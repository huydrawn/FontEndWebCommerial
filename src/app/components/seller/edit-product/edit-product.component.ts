import { Component, ElementRef, Inject, OnInit, ViewChild, ViewRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { async, from } from 'rxjs';
import { ProductType } from 'src/app/models/dto/product-type/product-type';
import { ConvertService } from 'src/app/services/convert.service';
import { DecodeService } from 'src/app/services/decode.service';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { ProductDetail, ProductInformation, ProductService, Attribute } from 'src/app/services/product.service';

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
    @ViewChild('describer') describer: ElementRef | undefined;

    imageProductURL: string | null = null;
    imageGroupProductURL: string[] = [];
    attributes: { name: string, value: { name: string }[] }[] = [];
    genders: [] = [];
    constructor(@Inject(MAT_DIALOG_DATA) public productInformation: ProductInformation, public productService: ProductService, public decode: DecodeService, public convert: ConvertService, public productTypeService: ProductTypeService) { }
    ngOnInit(): void {
        this.productTypeService.getGenders().subscribe((res) => {
            this.genders = res;
        })
        this.imageProductURL = this.convert.byteToURLFile(this.decode.decodeBase64toByteArray(this.productInformation.image!))

        var x = this.productInformation.details!.map((data) => {
            return data.attributes?.map((d) => {
                return d.name;
            })
        })
        for (let i = 0; i < x[0]!.length; i++) {
            var name = x[0]![i];
            this.attributes.push({ name: name!, value: [] })
        }

        for (let i = 0; i < this.productInformation.details!.length; i++) {
            for (let j = 0; j < this.productInformation.details![i].attributes!.length; j++) {
                for (let k = 0; k < this.attributes.length; k++) {
                    if (this.productInformation.details![i].attributes![j].name == this.attributes[k].name) {
                        this.attributes[k].value.push({ name: this.productInformation.details![i].attributes![j].value! });
                    }
                }

                this.imageGroupProductURL.push(this.convert.byteToURLFile(this.decode.decodeBase64toByteArray(this.productInformation.details![i].image!)))
            }
        }
        for (let i = 0; i < this.attributes.length; i++) {

            this.attributes[i].value = this.attributes[i].value!.filter((value, index, self) =>
                self.findIndex(item => item.name === value.name) === index
            );
        }
        
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
    async selectFileForImageProduct(event: any) {
        const file = this.onFileSelected(event);
        this.productInformation.image = await this.decode.encodeFileToBase64s(file).then((res) => {
            return (res as string).split(',')[1];
        })
        this.imageProductURL = this.convert.fileToURLFile(file);
    }

    async selectFileForGroupProduct(event: any, indexGroup: number) {
        const file = this.onFileSelected(event);
        this.productInformation.details![indexGroup].image = await this.decode.encodeFileToBase64s(file).then((res) => {
            return (res as string).split(',')[1];
        })
        this.imageGroupProductURL[indexGroup] = this.convert.fileToURLFile(file);
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            return file;
        }
        return '';
    }
    loadProduct() {
        this.productInformation.details = [];
        this.imageGroupProductURL = [];
        if (this.attributes.length == 1) {
            for (let i = 0; i < this.attributes[0].value.length; i++) {
                this.productInformation.details.push({ price: 0, inStock: 0, image: "", attributes: [{ name: this.attributes[0].name, value: this.attributes[0].value[i].name! }] })
            }
        }
        else {

            for (let i = 0; i < this.attributes[0].value.length; i++) {
                for (let j = 0; j < this.attributes[1].value.length; j++) {

                    this.productInformation.details.push({ price: 0, inStock: 0, image: "", attributes: [{ name: this.attributes[0].name, value: this.attributes[0].value[i].name }, { name: this.attributes[1].name, value: this.attributes[1].value[j].name }] })
                    this.imageGroupProductURL.push("");
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
            this.attributes[indexAttribute].value.splice(indexValue, 1);
        this.loadProduct();
    }
    cancelAttribute(index: number) {
        this.attributes.splice(index, 1);
        this.loadProduct();
    }

    applyForAllGroup() {
        for (let i = 0; i < this.productInformation.details!.length; i++) {
            this.productInformation.details![i].inStock = this.productInformation.inStock!;
            this.productInformation.details![i].price = this.productInformation.price!;
        }
    }
    editProduct() {
        console.log(this.productInformation)
        this.productService.update(this.productInformation);
    }
}
