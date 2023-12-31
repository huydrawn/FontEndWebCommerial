import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DecodeService {

  constructor() { }
  decodeBase64toByteArray(encodedData: string): Uint8Array {
  if(encodedData == undefined){
    return new Uint8Array;
  }
  else{
    const binaryString = atob(encodedData); // Giải mã Base64 thành chuỗi binary
    const length = binaryString.length;
    const bytes = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i); // Chuyển đổi thành mảng byte
    }
    return bytes;}
  }
  encodeFileToBase64(file: File, callback: (base64String: string) => void): string {
    const reader = new FileReader();
    reader.readAsDataURL(file); // Đọc và mã hóa tệp thành chuỗi Base64
    reader.onload = (event) => {
      const base64String = (event.target!.result as string).split(',')[1]; // Lấy phần Base64 từ kết quả
      if (callback) {
        callback(base64String);
      }
      return base64String;
    };
    return "";
  }
  async encodeFileToBase64s(file: File): Promise<string | null> {
    if (!file) {
      return null;
    }

    return new Promise<string | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target!.result as string;
        resolve(base64String);
      };
      reader.onerror = (event) => {
        reject(event);
      };
      reader.readAsDataURL(file);
    });
  }
}
