import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterRequest } from '../models/register-request';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterResponse } from '../models/register-response';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  baseUrl:string="http://localhost:8080/register"
  constructor(private router:Router,private http:HttpClient , private toastr:ToastrService) { }

  register(registerRequest:RegisterRequest){
     this.http.post<RegisterResponse>(this.baseUrl,registerRequest).subscribe((res) => {
      this.router.navigate(['/signin'])
       this.toastr.success('Hãy đăng nhập tài khoản của bạn bên dưới', 'Register Success', { timeOut: 3000 });
    },
      error => {
        this.toastr.error(error.error, 'Register Failure', { timeOut: 3000 }); 
      }
    );
  }
}
