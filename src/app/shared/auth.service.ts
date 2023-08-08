 
 
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, Auth} from 'firebase/auth';
 
import { Router } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
 
interface UserData {
  id: string;
  name: string;
  email: string;
  // Add other properties as needed
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userid:any ;

  constructor(private fireauth : AngularFireAuth , private fs: AngularFirestore, private router : Router) { }

  // login method
  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( (res:any) => {
        localStorage.setItem('token','true');

        if(res.user?.emailVerified == true) {
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['/varify-email']);
        }

    }, (err: { message: any; }) => {
        alert(err.message);
        this.router.navigate(['/login']);
    })
  }

  
  

 

  getUserById(userId: string): Observable<any> {
    return this.fs.collection('/users').doc(userId).snapshotChanges().pipe(
      map(snapshot => {
        if (snapshot.payload.exists) {
          const data = snapshot.payload.data() as UserData;
         
          return  { ...data };
        } else {
          return null;
        }
      })
    );
  }
  // register method
  register(email : string, password : string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( (res:any) => {
      alert('Registration Successful');
      this.sendEmailForVarification(res.user);
      
         this.addUserInfoToCollection(res.user.uid, email);
      this.router.navigate(['/login']);
    }, (err: { message: any; }) => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }



    // Function to add user information to Firestore collection
      addUserInfoToCollection(uid: string, email: string) {
        debugger
      const userRef = this.fs.collection('users').doc(uid);
 
      // You can add more user properties as needed
      const userInfo = {
        uid: uid,
        email: email,
        // Add other user information here
      };
  
      // Set the user information in the Firestore document
      userRef.set(userInfo)
        .then(() => {
          console.log('User information added to Firestore collection');
        })
        .catch((error: any) => {
          console.error('Error adding user information:', error);
        });
    }

  // sign out
  logout() {
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, (err: { message: any; }) => {
      alert(err.message);
    })
  }

  // forgot password
  forgotPassword(email : string) {
      this.fireauth.sendPasswordResetEmail(email).then(() => {
        this.router.navigate(['/varify-email']);
      }, (err: any) => {
        alert('Something went wrong');
      })
  }

  // email varification
  sendEmailForVarification(user : any) {
    console.log(user);
    user.sendEmailVerification().then((res : any) => {
      this.router.navigate(['/varify-email']);
    }, (err : any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }

  //sign in with google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then((res:any) => {

      this.router.navigate(['/dashboard']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));
      this.addUserInfoToCollection(res.user?.uid, res.user?.email);

    }, (err: { message: any; }) => {
      alert(err.message);
    })
  }
  
  //login with microsoft 
  // signInWithMicrosoft() {
  //   const microsoftProvider = new firebase.default.auth.OAuthProvider('microsoft.com');
  //   this.fireauth.signInWithPopup(microsoftProvider).then((result) => {
  //     // Handle successful login
  //     console.log(result);
  //   }).catch((error) => {
  //     // Handle error
  //     console.error(error);
  //   });
  // }



}
