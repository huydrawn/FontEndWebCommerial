import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimmerService {
  private timeoutId: any;
  
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
 
}
