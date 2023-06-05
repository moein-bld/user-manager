import { NgModule } from '@angular/core';

// @angular/materials modules
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';

const modules = [
	// @angular/materials
	MatSnackBarModule,
	MatGridListModule,
	MatCardModule,
	MatFormFieldModule,
	MatInputModule,
	MatButtonModule,
	MatTableModule,
	MatPaginatorModule,
	MatDialogModule,
	MatSelectModule,
	MatNativeDateModule,
	MatDatepickerModule,
	MatIconModule,
	MatSidenavModule,
	MatCheckboxModule,
	MatToolbarModule,
	MatMenuModule,
	MatListModule,
];

@NgModule({
	imports: modules,
	exports: modules,
})
export class MaterialModule {}
