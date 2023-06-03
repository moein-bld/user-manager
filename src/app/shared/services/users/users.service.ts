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
		this.addUser(user);
	}

	getUsers() {
		return this.db.list<VerifiedUser>('/gUsers').valueChanges();
	}

	getUserById() {
		return this.db.list<VerifiedUser>('/gUsers').valueChanges();
	}

	addUser(user: VerifiedUser) {
		this.getUsers().pipe(take(1)).toPromise().then(users => {
			const emailSet = new Set(users?.map(u => u.email));
			if (!emailSet.has(user.email)) return this.db.list('/gUsers').push(user)
			else return undefined
		})
	}

	updateUser(id: string, user: VerifiedUser) {
		return this.db.object(`/gUsers/${id}`).update(user);
	}

	deleteUser(id: string) {
		return this.db.object(`/gUsers/${id}`).remove();
	}
}
