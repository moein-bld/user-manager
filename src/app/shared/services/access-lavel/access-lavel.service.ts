import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { GAccessLaval } from './access-lavel';

@Injectable({
	providedIn: 'root',
})
export class AccessLavelService {
	constructor(private db: AngularFireDatabase) {}

	getAccessLavel() {
		return this.db.list<GAccessLaval>('/gAccessLavel').valueChanges();
	}

	updateUser(user: GAccessLaval[]) {
		return this.db.object(`/gAccessLavel`).set(user);
	}
}
