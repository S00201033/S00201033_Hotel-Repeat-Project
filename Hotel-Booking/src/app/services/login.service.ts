import { Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userData: any;// Initialize Firebase

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,

    public ngZone: NgZone ) {


  }

  login(data:any){
    return new Promise((resolve, reject) => { this.afAuth
    .signInWithEmailAndPassword(data.email, data.password)
    .then((result) => {
        localStorage.setItem("authenticatedByLoginToken",JSON.stringify(result))
          this.getUserData(data.email).subscribe(resp => {
            resolve(resp)
          })
    })
    .catch((error) => {
      window.alert(error.message);
      reject(error.message)
    });
    })
  }


  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider:any) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
        console.log('You have been successfully logged in!')
    }).catch((error) => {
        console.log(error)
    })
  }

  signup(data:any) {
    return new Promise((resolve, reject) => {
      this.afAuth
    .createUserWithEmailAndPassword(data.email, data.password)
    .then((result) => {

      // this.SendVerificationMail();
      console.log("signup resp ", result)
      localStorage.setItem('authenticatedByLoginToken',JSON.stringify(result))
      this.SetUserData(data);
      resolve(data)
    })
    .catch((error) => {
      window.alert(error.message);
      reject(error.message)
    });})
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('userData');
      this.router.navigate(['login']);
    });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `UserData/${user.email}`
    );
    const userData: any = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      mobileNumber: user.mobileNumber,
      role: user.role
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  getUserData(email: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `UserData/${email}`
    );
    return userRef.get();
  }

}
