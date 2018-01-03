import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  private user: Observable<firebase.User> = null;
  private userDetails: firebase.User;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.user = afAuth.authState;
    this.user.subscribe(user => {
      if (user) {
        this.userDetails = user;
        this.router.navigate(['/dashboard']);
      } else {
        this.userDetails = null;
        this.router.navigate(['/login']);
      }
    });
  }

  signInWithGoogle() {
    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  isAuthenticated() {
    return !!this.userDetails;
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  getCurrentUser() {
    return this.userDetails;
  }
}
