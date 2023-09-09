import { HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtToken } from '../models/jwt-token';

@Injectable({
  providedIn: 'root'
})
export class JwtinterceptorsService implements HttpInterceptor {
  private excludedUrls = ['https://accounts.google.com/.well-known/openid-configuration', '/www.googleapis.com/oauth2/v3/certs', 'https://www.googleapis.com/oauth2/v3/userinfo', 'https://openidconnect.googleapis.com/v1/userinfo', 'https://www.googleapis.com/oauth2/v4/token'
    , '/signup', 'http://localhost:8080/api/auth/csrf-token', 'https://accounts.google.com/.well-known/openid-configuration'];;
  private isFetchingToken = false;
  constructor(private tokenExtractor: HttpXsrfTokenExtractor) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.shouldExcludeUrl(req.url)) {
      return next.handle(req);
    }
    const authToken =  localStorage.getItem("token") as string;
    const jwtToken = JSON.parse(authToken) as JwtToken;
    if (jwtToken ) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${jwtToken.token}`)
      });   
    }
    
    return next.handle(req);
  }
  private shouldExcludeUrl(url: string): boolean {
    return this.excludedUrls.some(excludedUrl => url.includes(excludedUrl));
  }

}
