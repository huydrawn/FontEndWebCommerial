import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtToken } from '../models/jwt-token';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {
  baseUrl:string = "http://localhost:8080/token";
  constructor(private http:HttpClient ) { }

  refreshToken(){
    this.http.get<JwtToken>(`${this.baseUrl}/refresh`).subscribe((res)=>{
      localStorage.setItem("token" , JSON.stringify(res))
    }, error=>{
      localStorage.removeItem("token")
    }
    )
  }
}
