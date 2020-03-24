import { Injectable, NgZone, EventEmitter } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AppURl } from 'src/app/config/app-urls.config';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    userData: any; // Save logged in user data

    //Observable 
    userInformation$ = new EventEmitter<object>();

    constructor(
        public afs: AngularFirestore,   // Inject Firestore service
        public afAuth: AngularFireAuth, // Inject Firebase auth service
        public router: Router,
        public ngZone: NgZone // NgZone service to remove outside scope warning
    ) {
        /* Saving user data in localstorage when
        logged in and setting up null when logged out */
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user'));
            } else {
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        });
    }

    // Sign in with email/password
    SignIn(email, password) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                this.ngZone.run(() => {
                    this.router.navigate([AppURl.AppSuperHero]);
                });
                this.SetUserData(result.user);
            }).catch((error) => {
                window.alert(error.message);
            });
    }

    // Sign up with email/password
    SignUp(email, password) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                /* Call the SendVerificaitonMail() function when new user sign
                up and returns promise */
                this.SendVerificationMail();
                this.SetUserData(result.user);
            }).catch((error) => {
                window.alert(error.message);
            });
    }

    // Send email verfificaiton when new user sign up
    SendVerificationMail() {
        return this.afAuth.auth.currentUser.sendEmailVerification()
            .then(() => {
                this.router.navigate([AppURl.AppAuth, AppURl.AppAuthVerifyEmailAddress]);
            });
    }

    // Reset Forggot password
    ForgotPassword(passwordResetEmail) {
        return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                window.alert('Password reset email sent, check your inbox.');
            }).catch((error) => {
                window.alert(error);
            });
    }

    // Returns true when user is looged in and email is verified
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user !== null && user.emailVerified !== false) ? true : false;
    }

    // Sign in with Google
    GoogleAuth() {

        return this.AuthLogin(new auth.GoogleAuthProvider());

    }

    // Auth logic to run auth providers
    AuthLogin(provider) {

        return this.afAuth.auth.signInWithPopup(provider)
            .then((result) => {
                this.ngZone.run(() => {
                    this.router.navigate([AppURl.AppSuperHero]);
                });
                this.SetUserData(result.user);
            }).catch((error) => {
                window.alert(error);
            });

    }

    SetUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
        };
        this.router.navigate([AppURl.AppHome]);
        return userRef.set(userData, {
            merge: true
        });
    }

    // Sign out
    SignOut() {
        return this.afAuth.auth.signOut().then(() => {
            localStorage.removeItem('user');
            let changeForm = {
                uid: "",
                email: "",
                displayName: "",
                photoURL: "",
                emailVerified: false
            };
            this.userInformation$.emit(changeForm);
            this.router.navigate([AppURl.AppAuth, AppURl.AppAuthSignIn]);
        });
    }
}
