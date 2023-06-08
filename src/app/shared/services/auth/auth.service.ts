import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from '@firebase/app-compat';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';
import { VerifiedUser } from './user';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	currentUser$: Observable<any>;

	constructor(private afAuth: AngularFireAuth, private _snackBar: MatSnackBar, private router: Router, private userService: UsersService) {
		this.currentUser$ = this.afAuth.authState;
	}

	loginWithGoogle() {
		const provider = new firebase.auth.GoogleAuthProvider();
		this.afAuth
			.signInWithPopup(provider)
			.then((userCredential: any) => {
				const { displayName, email, phoneNumber, photoURL, uid, metadata } = userCredential.user.multiFactor.user;
				this.saveUser(displayName, email, phoneNumber, photoURL, uid, metadata, true);
				this.router.navigate(['/dashboard']);
			})
			.catch(error => {
				this.handelError(error.code);
			});
	}

	signUp(email: string, password: string) {
		this.afAuth
			.createUserWithEmailAndPassword(email, password)
			.then((userCredential: any) => {
				const { displayName, email, phoneNumber, photoURL, uid, metadata } = userCredential.user.multiFactor.user;
				this.saveUser(displayName, email, phoneNumber, photoURL, uid, metadata, true);
				this.router.navigate(['/dashboard']);
			})
			.catch(error => {
				this.handelError(error.code);
			});
	}

	signIn(email: string, password: string) {
		this.afAuth
			.signInWithEmailAndPassword(email, password)
			.then((userCredential: any) => {
				const { displayName, email, phoneNumber, photoURL, uid, metadata } = userCredential.user.multiFactor.user;
				this.saveUser(displayName, email, phoneNumber, photoURL, uid, metadata);
				this.router.navigate(['/dashboard']);
			})
			.catch(error => {
				this.handelError(error.code);
			});
	}

	logout() {
		return this.afAuth.signOut().then(res => {
			this.router.navigate(['/auth']);
			this.userService.deleteUserFromLocalStorage();
		});
	}

	getCurrentUser() {
		return this.afAuth.authState;
	}

	updateDisplayName(displayName: string) {
		return this.afAuth.currentUser.then(user => {
			if (user) {
				this.userService.getUsers().subscribe(data => {
					data.forEach(item => {
						if (item.email === user?.email) {
							item.displayName = displayName
							console.log(item);
						}
					})
				})
				return user.updateProfile({
					displayName: displayName,
				});
			} else {
				throw new Error('User not authenticated');
			}
		});
	}

	private saveUser(displayName: string, email: string, phoneNumber: string, photoURL: string, uid: string, metadata: any, add?: boolean) {
		const user: VerifiedUser = {
			id: uid,
			ts: metadata.lastLoginAt,
			accessLevel: 'default',
			email: email,
			isTermsAccepted: false,
			phoneNumber: phoneNumber === null ? '' : phoneNumber,
			signUpTimeStamp: metadata.createdAt,
			displayName: displayName === null ? '' : displayName,
			isDisabled: false,
			avatarFullPath: photoURL === null ? '' : photoURL,
		};
		this.userService.saveInLocalStorage(user);

		if (add) this.userService.addUser(user);
	}

	private handelError(error: string) {
		this._snackBar.open(`${error.split('/')[1]}`, 'OK', {
			horizontalPosition: 'center',
			verticalPosition: 'top',
			duration: 4000,
			panelClass: ['red-snackbar'],
		});
	}
}
