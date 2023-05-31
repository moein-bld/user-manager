import { Injectable } from '@angular/core';
import { Auth, UserCredential, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	currentUser$ = authState(this.auth);

	constructor(private auth: Auth, ) {}

	// GoogleAuth() {
	// 	return this.AuthLogin(new GoogleAuthProvider());
	// }
	// // Auth logic to run auth providers
	// AuthLogin(provider: any) {
	// 	return this.afAuth
	// 		.signInWithPopup(provider)
	// 		.then(result => {
	// 			console.log('You have been successfully logged in!');
	// 		})
	// 		.catch(error => {
	// 			console.log(error);
	// 		});
	// }

	

	signUp(email: string, password: string): Observable<UserCredential> {
		return from(createUserWithEmailAndPassword(this.auth, email, password));
	}

	signIn(email: string, password: string): Observable<any> {
		return from(signInWithEmailAndPassword(this.auth, email, password));
	}

	logout(): Observable<any> {
		return from(this.auth.signOut());
	}
}
