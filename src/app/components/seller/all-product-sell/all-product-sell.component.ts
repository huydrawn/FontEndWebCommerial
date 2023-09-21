import { Component, Injectable, OnInit } from '@angular/core';
import { MainPageComponent } from '../main-page/main-page.component';
import { InformationProduct, ProductDetail, ProductInformation, ProductService } from 'src/app/services/product.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddSellProductComponent } from '../add-sell-product/add-sell-product.component';
import { ScrollStrategy, ViewportRuler } from '@angular/cdk/overlay';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-all-product-sell',
  templateUrl: './all-product-sell.component.html',
  styleUrls: ['./all-product-sell.component.css']
})
export class AllProductSellComponent implements OnInit {
  delete(id: number, index: number) {
    this.productService.delete(id);
  }
  criterias: { name: string, criteria: string }[] = [{ name: "Tên Sản Phẩm", criteria: "Please put at least first 2 characters of word" }, { name: "Mã Sản Phẩm", criteria: "Please put id of your product" }]
  indexOfChoosenCriteria: number = 0;
  productInformation: InformationProduct | undefined;
  constructor(public productService: ProductService,public productTypeService:ProductTypeService ,private dialog: MatDialog, private viewRuler: ViewportRuler) { }
  openDialog(id:number) {
    this.productService.getInformationDetailProductByID(id).subscribe((res) => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.maxHeight = '100vh';
      dialogConfig.width = '60%';
      dialogConfig.data = res as ProductInformation;
      dialogConfig.scrollStrategy = new CustomScrollStrategy(this.viewRuler);
      this.dialog.open(EditProductComponent, dialogConfig)
    })
  }
  ngOnInit(): void {
    this.productService.loadInFomationProducts();
  }
  getNumberProductGetOutOfInStock():number{
    var result = 0 ;
    for (let i = 0; i < this.productService.infoProduct.length; i++) {
      if(this.productService.infoProduct[i].inStock == 0) result++;
    }
    return result;
  }
}
@Injectable()
export class CustomScrollStrategy implements ScrollStrategy {
  constructor(private viewportRuler: ViewportRuler) { }

  attach() { }

  enable() {
    const documentElement = document.documentElement;
    const viewportHeight = this.viewportRuler.getViewportSize().height + 1000;
    const dialogHeight = 400; // Thay thế bằng chiều cao của dialog của bạn

    if (dialogHeight > viewportHeight) {
      documentElement.style.overflowY = 'hidden';
    }
  }
 

  disable() {
    document.documentElement.style.overflowY = 'auto';
  }
}