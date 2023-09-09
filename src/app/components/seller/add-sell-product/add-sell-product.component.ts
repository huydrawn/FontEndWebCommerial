import { Component } from '@angular/core';

@Component({
  selector: 'app-add-sell-product',
  templateUrl: './add-sell-product.component.html',
  styleUrls: ['./add-sell-product.component.css']
})
export class AddSellProductComponent {
  imageProduct: string | undefined;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log(file)
      this.imageProduct = URL.createObjectURL(file)
    }
    return '';
  }

}

