import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {

  constructor() { }

  byteToBlob(byte: Uint8Array): Blob {
    return new Blob([byte], { type: 'application/octet-stream' });
  }
  byteToURLFile(byte: Uint8Array): string {
    return URL.createObjectURL(new Blob([byte], { type: 'application/octet-stream' }));
  }
  fileToURLFile(file: File): string {
    if (file) {
      return URL.createObjectURL(file);
    }
    return ''
  }

}
