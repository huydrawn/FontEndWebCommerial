import { Injectable } from '@angular/core';
import { JwtTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class TimmerService {
  private timeoutId: any;
  constructor(private jwtTokenService:JwtTokenService ) {
    
  }
  startTimer(minutes: number, logoutCallback: () => void): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      logoutCallback();
    }, minutes * 60 * 1000);
  }

  resetTimer(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  refreshToken(expried:Date){
    const timeToExpried = new Date(expried).getTime() - new Date().getTime();
    if(timeToExpried < 60 * 1000){   
      this.jwtTokenService.refreshToken();
    }

  }
 
}
