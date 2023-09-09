import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {

  constructor() { }

  byteToBlob(byte:Uint8Array) : Blob {
    return  new Blob([byte] , { type: 'application/octet-stream' });
  }
}
