import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { GAccessLaval } from 'src/app/shared/services/access-lavel/access-lavel';
import { AccessLavelService } from 'src/app/shared/services/access-lavel/access-lavel.service';

let ELEMENT_DATA: GAccessLaval[] = [];
@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
	private subscription: Subscription = new Subscription();
	displayedColumns: string[] = ['title', 'isAccessLevels', 'isAllSpins', 'isCapture', 'isEdit', 'isSetting', 'isTemplateBuilder', 'isTemplateCapture', 'isUserModels', 'isUsers'];
	dataSource = new MatTableDataSource(ELEMENT_DATA);

	constructor(private database: AccessLavelService) {}

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
			this.dataSource.data = [];
			data.forEach(item => {
				this.dataSource.data.push(item);
			});
			this.dataSource._updateChangeSubscription();
		});
	}

	updateRole() {
		this.database
			.updateUser(this.dataSource.data)
			.then(() => console.log('Update successful'))
			.catch(error => console.log('Update failed: ', error));
	}
}