import { Injectable } from '@angular/core';
import { VerifiedUser } from '../auth/user';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { take } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UsersService {
	constructor(private db: AngularFireDatabase) {}

	saveInLocalStorage(user: VerifiedUser) {
		localStorage.setItem('user', JSON.stringify(user));
	}

	deleteUserFromLocalStorage() {
		localStorage.removeItem('user');
	}

	getUserFromLocalStorage() {
		return JSON.parse(localStorage.getItem('user') || '{}');
	}

	getUsers() {
		return this.db.list<VerifiedUser>('/gUsers').valueChanges();
	}

	getUserById() {
		return this.db.list<VerifiedUser>('/gUsers').valueChanges();
	}

	addUser(user: VerifiedUser) {
		this.getUsers()
			.pipe(take(1))
			.toPromise()
			.then(users => {
				const emailSet = new Set(users?.map(u => u.email));
				if (!emailSet.has(user.email)) return this.db.list('/gUsers').push(user);
				else return undefined;
			});
	}

	updateUser(user: VerifiedUser, id: string) {
		this.db.object(`/gUsers/${id}`).update(user);
	}

	updateUsers(users: VerifiedUser[]) {
		return this.db.object(`/gUsers`).set(users);
	}

	deleteUser(id: string) {
		return this.db.object(`/gUsers/${id}`).remove();
	}
}
