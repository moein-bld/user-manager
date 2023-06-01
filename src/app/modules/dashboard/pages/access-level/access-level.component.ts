import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
	name: string;
	position: number;
	weight: number;
	symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
	{ position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
];

@Component({
	selector: 'app-access-level',
	templateUrl: './access-level.component.html',
	styleUrls: ['./access-level.component.scss'],
})
export class AccessLevelComponent {
	displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
	dataSource = new MatTableDataSource(ELEMENT_DATA);

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
}
