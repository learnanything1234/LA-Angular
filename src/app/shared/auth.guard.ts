import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
 
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(
    private router: Router,
    private fireauth: AngularFireAuth
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.fireauth.authState.pipe(
      take(1), // Take only the first emitted value (authentication status)
      map(user => {
        if (user) {
          // User is authenticated, allow access
          return true;
        } else {
          // User is not authenticated, redirect to login page
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
  
}
