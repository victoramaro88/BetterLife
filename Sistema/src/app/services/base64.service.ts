import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Base64Service {

  constructor() {}

  convertNumberToBase64(num: number): string {
    const numString = num.toString();
    return btoa(numString);
  }

  decodeBase64ToNumber(base64: string): number {
    const decodedString = atob(base64);
    return parseFloat(decodedString);
  }
}
