import { AfterContentInit, Injectable, OnInit } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpdateUser } from '../models/dto/user/update-user';
import { Response } from '../models/response';
import { DecodeService } from './decode.service';
import { ConvertService } from './convert.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService implements  OnInit {
  user: User | undefined;
  imageUser:string|undefined;
  private base_url = "http://localhost:8080/user"
  constructor(private http: HttpClient, private decode: DecodeService, private convert: ConvertService, private toastr:ToastrService) { }
  ngOnInit(): void {
     this.http.get<User>(this.base_url).subscribe((res) => {
      this.user = res;
    });

  }
  getAvatar(): string {
   return this.imageUser!;
  }

  loadUser() {
    this.http.get<User>(this.base_url).subscribe((res) => {
      this.user = res;
      this.imageUser = this.convert.byteToURLFile(this.decode.decodeBase64toByteArray(res.avatar));
    });
  }
  updateUser(update: UpdateUser) {
     this.http.post<Response>(this.base_url, update).subscribe((res=>{
        this.toastr.success("update thành công" , "Success" , {timeOut:3000})
        this.loadUser();
    }),(error)=>{
      this.toastr.error("update thất bại" , "Failure" , {timeOut:3000})
    });
  }

 
}
