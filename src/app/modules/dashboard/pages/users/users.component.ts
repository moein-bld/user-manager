import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { GAccessLaval } from 'src/app/shared/services/access-lavel/access-lavel';
import { AccessLavelService } from 'src/app/shared/services/access-lavel/access-lavel.service';
import { VerifiedUser } from 'src/app/shared/services/auth/user';
import { UsersService } from 'src/app/shared/services/users/users.service';

const Users: VerifiedUser[] = [];
const AccessLavel: GAccessLaval[] = [];

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
	private subscriptionUser: Subscription = new Subscription();
	private subscriptionAccess: Subscription = new Subscription();

	roles: GAccessLaval[] = [];

	displayedColumns: string[] = ['avatarFullPath', 'displayName', 'email', 'role', 'action'];
	dataSource = new MatTableDataSource(Users);

	constructor(private gAL: AccessLavelService, private gU: UsersService) {}

	ngOnInit() {
		this.getUsers();
		this.getAccess()
	}

	ngOnDestroy() {
		this.subscriptionUser.unsubscribe();
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	getUsers() {
		this.subscriptionUser = this.gU.getUsers().subscribe(data => {
			this.dataSource.data = [];
			data.forEach(item => {
				this.dataSource.data.push(item);
			});
			this.dataSource._updateChangeSubscription();
		});
	}

	getAccess() {
		this.subscriptionAccess = this.gAL.getAccessLavel().subscribe(data => {
			this.roles = data
		})
	}
}
