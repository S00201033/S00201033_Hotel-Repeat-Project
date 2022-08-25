import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public  jwtHelper = new JwtHelperService();

  constructor() { }
  isLoggedIn(){
    let token = this.getToken();
    if(token){
      if(this.jwtHelper.isTokenExpired(token)){
        localStorage.removeItem('authenticatedByLoginToken')
        localStorage.removeItem('userData')
        return false
      }
      return true
    }
    return false
  }
  getToken(): string | null {
    return localStorage.getItem('authenticatedByLoginToken') ?? null
  }
}
