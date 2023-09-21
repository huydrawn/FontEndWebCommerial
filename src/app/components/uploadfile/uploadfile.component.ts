import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConvertService } from 'src/app/services/convert.service';
import { DecodeService } from 'src/app/services/decode.service';

import { ProductTypeService } from 'src/app/services/product-type.service';


@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})

export class UploadfileComponent {
  @ViewChild('image', { static: true }) image: ElementRef | undefined;
  productName: string = '';
  files: File[] = [];
  selectedFiles: { file: File; url: string }[] = []; // Array of objects to store files and their URLs
  images: string[] = [];

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private decode: DecodeService, private convert: ConvertService, private producttypeservice: ProductTypeService) { }

  remove(url: string) {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      if (this.selectedFiles[i].url == url) {
        this.selectedFiles.splice(i, 1);
        this.files.splice(i, 1);
        this.image!.nativeElement.value = '';
      }
    }
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = URL.createObjectURL(file); // Create a temporary URL for the image
        this.selectedFiles.push({ file, url }); // Store the file and its URL in the array
        this.files.push(file);
      }
    }
  }
  url: string = "";
  decodeBase64(encodedData: string): Uint8Array {
    const binaryString = atob(encodedData); // Giải mã Base64 thành chuỗi binary
    const length = binaryString.length;
    const bytes = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i); // Chuyển đổi thành mảng byte
    }

    return bytes;
  }

  onSubmit(): void {
    if (this.files[0]) {
      console.log("ok")
    }
    const blob = new Blob([this.files[0]], { type: 'application/octet-stream' });
    // this.convert.

    // this.http.post("http://localhost:8080/test" ,new FileTest(blob) ).subscribe((res)=>{
    //   // const blob = new Blob([res], { type: 'application/octet-stream' });
    //   // this.images.push(URL.createObjectURL(blob));
    //   console.log(res)
    // },
    // (error)=>{

    // })
    // console.log(this.productName);
    // console.log(this.files);
    // const dataForm = new FormData();
    // dataForm.append("name", this.productName);
    // for (let i = 0; i < this.files.length; i++) {
    //   dataForm.append("images", this.files[i]);
    // }
    //  this.http.get<ProductType>('http://localhost:8080/product/type')
    // .subscribe((data) => {
    //   const s = this.decodeBase64(data.image);
    //   const blob = new Blob([s], { type: 'application/octet-stream' });
    //   const url = URL.createObjectURL(blob);
    //   this.images.push(url);
    //   // Xử lý dữ liệu blob tại đây (hiển thị hoặc lưu trữ vào ổ đĩa)
    // });

    // this.producttypeservice.getProductsType().subscribe((res)=>{
    //   for(let i = 0 ;  i < res.length ; i++){
        // const s = this.decodeBase64(res[i].image);
    //     const blob = new Blob([s], { type: 'application/octet-stream' });
    //     const url = URL.createObjectURL(blob);
    //     this.images.push(url); // Store the file and its URL in the array
    //   }
    // });
    // this.http.post("http://localhost:8080/product/type/images", dataForm).subscribe((res) => {
    //   console.log("ok");
    // }, (error) => {
    // }
    // )

    // Handle submitting the product and selected files to the server or perform your desired processing.
    // console.log('Tên sản phẩm:', this.productName);
    // console.log('Danh sách các tệp đã chọn:', this.selectedFiles);
    // const formData = new FormData();
    // const files: File[] = [];
    // for (let i = 0; i < this.selectedFiles.length; i++) {
    //   files[i] = this.selectedFiles[i].file;
    // }
    // formData.append("name", "thời trang nam");
    // formData.append("image", this.files[0]);
    // this.http.post("http://localhost:8080/product/type", formData).subscribe(
    //   (response) => {
    //     console.log('Sản phẩm và tệp đã được tải lên thành công:', response);
    //     // Xử lý phản hồi từ máy chủ (nếu cần)
    //   },
    //   (error) => {
    //     console.error('Lỗi tải sản phẩm và tệp lên máy chủ:', error);
    //     // Xử lý lỗi (nếu cần)
    //   }
    // );



    // Send the product and selected files to the server or perform your desired processing.
  // }
}
}
// class FileTest{
//   file : Blob;
//   constructor(file:Blob){
//     this.file = file;
//   }
// }
