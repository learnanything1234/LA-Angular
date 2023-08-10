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
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['/varify-email']);
      }

    }, (err: { message: any; }) => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }






  // async  getUserById() {
  //   const app = initializeApp(environment.firebaseConfig);
  //   const db = getFirestore(app);
  //   const auth = getAuth(app);

  //   try {
  //     const user = auth.currentUser;

  //     if (user) {
  //       const documentRef = doc(db, '/users', user.uid);
  //       const docSnapshot = await getDoc(documentRef);
  //                console.log( docSnapshot.data())
  //       if (docSnapshot.exists()) {
  //         const data = docSnapshot.data();
  //         console.log('Document data:', data);
  //       } else {
  //         console.log('Document not found');
  //       }
  //     } else {
  //       console.log('User not authenticated');
  //     }
  //   } catch (error) {
  //     console.error('Error getting document:', error);
  //   }
  // }
  // register method
  register(email: string, password: string) {

    createUserWithEmailAndPassword(this.auth, email, password).then((res: any) => {
      alert('Registration Successful');
      this.sendEmailForVarification(res.user);

      //  this.addUserInfoToCollection(res.user.uid, email);
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
      alert('If you have an account with us, your password reset email has been sent. Please check your inbox.');
      this.router.navigate(['/login']);
    }, (err: any) => {
      alert('If you have an account with us, your password reset email has been sent. Please check your inbox.');
      this.router.navigate(['/login']);
    })
  }

  // email varification
  sendEmailForVarification(user: any) {
    console.log(user);
    sendEmailVerification(user).then((res: any) => {
      this.router.navigate(['/varify-email']);
    }, (err: any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }

  //sign in with google
  googleSignIn() {
    return signInWithPopup(this.auth, new GoogleAuthProvider).then((res: any) => {

      this.router.navigate(['/dashboard']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));
      // this.addUserInfoToCollection(res.user?.uid, res.user?.email);

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
      console.log(result);
      this.router.navigate(['/dashboard']);
    }).catch((error) => {
      // Handle error
      console.error(error);
    });
  }



}
