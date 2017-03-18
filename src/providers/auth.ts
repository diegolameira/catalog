import { Injectable, EventEmitter } from '@angular/core';
import { AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods } from 'angularfire2';
import * as firebase from 'firebase';

import { Platform } from 'ionic-angular';
import { Facebook } from 'ionic-native';

@Injectable()
export class Auth {
  private authState: FirebaseAuthState;
  public onAuthChange: EventEmitter<any> = new EventEmitter();

  constructor(public auth$: AngularFireAuth, private platform: Platform) {
    this.authState = auth$.getAuth();
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
      this.onAuthChange.next(state);
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  signInWithFacebook(): firebase.Promise<any> {

    if (this.platform.is('cordova')) {
      return Facebook.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      });
    } else {
      return this.auth$.login({
        provider: AuthProviders.Facebook,
        method: AuthMethods.Popup
      });
    }

  }

  signOut(): void {
    this.auth$.logout();
  }

}
