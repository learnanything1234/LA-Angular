import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: Auth
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const auth = getAuth();

    // Using an observable to handle the async nature of onAuthStateChanged
    return new Observable<boolean | UrlTree>(observer => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user);
          observer.next(true); // User is authenticated, allow access
        } else {
          observer.next(this.router.createUrlTree(['/home'])); // User is not authenticated, redirect to login
        }
        observer.complete();
      });

      // Unsubscribe when the observable is destroyed
      return () => unsubscribe();
    });
  }
}
