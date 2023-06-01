import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, UserCredential, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	currentUser$ = authState(this.auth);

	constructor(private auth: Auth) {}

	loginWithGoogle() {
		return from(signInWithPopup(this.auth, new GoogleAuthProvider()));
	}

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
