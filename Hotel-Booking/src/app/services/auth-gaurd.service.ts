import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {

  constructor() { }
}




@Injectable({
  providedIn: 'root'
})
export class OnlyClient implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const authenticationToken = localStorage.getItem('authenticatedByLoginToken')
      if(authenticationToken){
        let user: string = JSON.parse(localStorage.getItem('userData') ?? "")
        if(user){
        return true
        }

      this.router.navigate(['/']);
        return false
      }
      this.router.navigate(['/login']);
      return false
  }

}
