import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { GAccessLaval } from 'src/app/shared/services/access-lavel/access-lavel';
import { AccessLavelService } from 'src/app/shared/services/access-lavel/access-lavel.service';
import { VerifiedUser } from 'src/app/shared/services/auth/user';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { SharedModule } from 'src/app/shared/shared.module';

let Users: VerifiedUser[] = [];
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
	originalData: GAccessLaval[] = [];

	displayedColumns: string[] = ['avatarFullPath', 'displayName', 'email', 'role', 'action'];
	dataSource = new MatTableDataSource(Users);
	disable: boolean = true;

	constructor(private gAL: AccessLavelService, private gU: UsersService, private _snackBar: MatSnackBar, public dialog: MatDialog) {}

	ngOnInit() {
		this.getUsers();
		this.getAccess();
	}

	ngOnDestroy() {
		this.subscriptionUser.unsubscribe();
		this.subscriptionAccess.unsubscribe();
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	filterWithRole(role: string) {
		this.dataSource.filter = role.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	truncateString(name: string, email: string) {
		if (name != '') return '';
		return email.substring(0, 2);
	}

	getUsers() {
		this.subscriptionUser = this.gU.getUsers().subscribe(data => {
			this.dataSource.data = data;
			Users = data;
			this.disable = false;
			this.originalData = JSON.parse(JSON.stringify(data));
			this.dataSource._updateChangeSubscription();
		});
	}

	getAccess() {
		this.subscriptionAccess = this.gAL.getAccessLavel().subscribe(data => {
			this.roles = data;
		});
	}

	updateRole() {
		if (JSON.stringify(this.dataSource.data) === JSON.stringify(this.originalData)) return;
		this.gU
			.updateUsers(this.dataSource.data)
			.then(() => {
				this._snackBar.open('Update successful', 'OK', {
					horizontalPosition: 'center',
					verticalPosition: 'top',
					duration: 50000,
					panelClass: ['success-snackbar'],
				});
			})
			.catch(error => console.log('Update failed: ', error));
	}

	canselChange() {
		if (JSON.stringify(this.dataSource.data) === JSON.stringify(this.originalData)) return;
		this.dataSource.data = JSON.parse(JSON.stringify(this.originalData));
	}

	openDialog() {
		this.dialog.open(UsersDialog);
	}
}

@Component({
	selector: 'users-dialog',
	templateUrl: 'users-dialog.html',
	styleUrls: ['./users.component.scss'],
	standalone: true,
	imports: [SharedModule, CommonModule],
})
export class UsersDialog implements OnInit {
	allUsers: VerifiedUser[] = [];
	deleteUsers: VerifiedUser[] = [];
	enableUsers: VerifiedUser[] = [];
	disableUsers: VerifiedUser[] = [];
	btnText: string = 'change';
	selectedUsers: VerifiedUser[] = [];

	constructor(private gU: UsersService, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<UsersDialog>) {}

	ngOnInit() {
		this.allUsers = Users;
		Users.forEach(item => {
			if (item.isDisabled) this.disableUsers.push(JSON.parse(JSON.stringify(item)));
			if (!item.isDisabled) this.enableUsers.push(JSON.parse(JSON.stringify(item)));
		});
	}

	truncateString(name: string, email: string) {
		if (name != '') return '';
		return email.substring(0, 2);
	}

	onTabChange(event: number) {
		if (event === 0) {
			this.btnText = 'Change';
		} else if (event === 1) {
			this.btnText = 'Disable';
		} else if (event === 2) {
			this.btnText = 'Enable';
		}
	}

	onSelectionChangeUser(event: any) {
		this.selectedUsers = event.source.selectedOptions.selected.map((option: any) => option.value);
	}

	changeStatus() {
		if (this.btnText === 'Disable') {
			this.selectedUsers.forEach(item => {
				item.isDisabled = false;
			});
		}
		if (this.btnText === 'Enable') {
			this.selectedUsers.forEach(item => {
				item.isDisabled = true;
			});
		}

		const mergedArray = [...this.selectedUsers, ...Users]
			.reduce((acc, curr) => {
				if (!acc.has(curr.email)) {
					acc.set(curr.email, curr);
				}
				return acc;
			}, new Map())
			.values();

		const mearg: VerifiedUser[] = Array.from(mergedArray);
		console.log(mearg);
		this.gU.updateUsers(mearg).then(() => {
			this._snackBar.open('Update successful', 'OK', {
				horizontalPosition: 'center',
				verticalPosition: 'top',
				duration: 50000,
				panelClass: ['success-snackbar'],
			});
			this.dialogRef.close();
		});
	}
}
