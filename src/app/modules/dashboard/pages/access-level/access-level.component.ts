import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { GAccessLaval } from 'src/app/shared/services/access-lavel/access-lavel';
import { AccessLavelService } from 'src/app/shared/services/access-lavel/access-lavel.service';

const AccessLavel: GAccessLaval[] = [];

@Component({
	selector: 'app-access-level',
	templateUrl: './access-level.component.html',
	styleUrls: ['./access-level.component.scss'],
})
export class AccessLevelComponent implements OnInit, OnDestroy {
	private subscription: Subscription = new Subscription();
	displayedColumns: string[] = ['title', 'isAccessLevels', 'isAllSpins', 'isCapture', 'isEdit', 'isSetting', 'isTemplateBuilder', 'isTemplateCapture', 'isUserModels', 'isUsers'];
	dataSource = new MatTableDataSource(AccessLavel);
	originalData: GAccessLaval[] = [];
	editedRowIndex: number = -1;

	constructor(private database: AccessLavelService, private _snackBar: MatSnackBar) {}

	ngOnInit() {
		this.getAccess();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	getAccess() {
		this.subscription = this.database.getAccessLavel().subscribe(data => {
			this.originalData = JSON.parse(JSON.stringify(data));
			this.dataSource.data = data;
			this.dataSource._updateChangeSubscription();
		});
	}

	updateRole() {
		if (JSON.stringify(this.dataSource.data) === JSON.stringify(this.originalData)) return;
		this.database
			.updateUser(this.dataSource.data)
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

	startEdit(row: GAccessLaval) {
		this.editedRowIndex = this.dataSource.data.indexOf(row);
	}

	cancelEdit() {
		this.editedRowIndex = -1;
	}

	saveEdit(row: GAccessLaval) {
		this.editedRowIndex = -1;
	}
}
