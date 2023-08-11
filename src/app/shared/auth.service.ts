import { Injectable } from '@angular/core';

import { GoogleAuthProvider, OAuthProvider, browserSessionPersistence } from 'firebase/auth';

import { Router } from '@angular/router';
import {
  Auth, createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
  sendEmailVerification,
  signInWithEmailAndPassword
} from '@angular/fire/auth';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userid: any;

  constructor(private auth: Auth, private router: Router) { auth.setPersistence(browserSessionPersistence) }

  // login method
  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password).then((res: any) => {
      localStorage.setItem('token', 'true');

      if (res.user?.emailVerified == true) {
        this.loggedInSuccessfully()
      } else {
        this.router.navigate(['/varify-email']);
      }

    }, (err: { message: any; }) => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }



  // register method
  register(email: string, password: string) {

    createUserWithEmailAndPassword(this.auth, email, password).then((res: any) => {
      alert('Registration Successful. Please check your inbox to confirm your email address.');
      this.sendEmailForVarification(res.user);
      this.router.navigate(['/login']);
    }, (err: { message: any; }) => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  // sign out
  logout() {
    signOut(this.auth).then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, (err: { message: any; }) => {
      alert(err.message);
    })
  }

  // forgot password
  forgotPassword(email: string) {
    sendPasswordResetEmail(this.auth, email).then(() => {
      this.router.navigate(['/varify-email']);
    }, (err: any) => {
      alert('Something went wrong');
    })
  }

  // email varification
  sendEmailForVarification(user: any) {
    sendEmailVerification(user).then((res: any) => {
      this.router.navigate(['/varify-email']);
    }, (err: any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }

  //sign in with google
  googleSignIn() {
    return signInWithPopup(this.auth, new GoogleAuthProvider).then((res: any) => {
      this.loggedInSuccessfully();
    }, (err: { message: any; }) => {
      alert(err.message);
    })
  }

  //login with microsoft 
  signInWithMicrosoft() {
    console.log("signing in with microsoft...")
    const microsoftProvider = new OAuthProvider('microsoft.com');
    signInWithPopup(this.auth, microsoftProvider).then((result) => {
      // Handle successful login
      this.loggedInSuccessfully()
    }).catch((error) => {
      // Handle error
      console.error(error);
    });
  }

  private loggedInSuccessfully() {

    this.router.navigate(['home']);
  }

}
