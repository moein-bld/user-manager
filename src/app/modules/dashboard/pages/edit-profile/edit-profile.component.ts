import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
	selector: 'app-edit-profile',
	templateUrl: './edit-profile.component.html',
	styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
	form: FormGroup;
	avatar: string | null = '';
	constructor(private auth: AuthService, private fb: FormBuilder, private _snackBar: MatSnackBar) {
		this.form = this.fb.group({
			email: [{value: '', disabled: true}, []],
			displayName: ['', [Validators.required]],
			phoneNumber: ['', [Validators.required]],
		});
	}

	ngOnInit() {
		this.getCurrentUser();
	}

	getCurrentUser() {
		this.auth.getCurrentUser().subscribe(data => {
			if (data) {
				console.log(data);
				this.form.get('email')?.setValue(data?.email)
				this.form.get('displayName')?.setValue(data?.displayName)
				this.form.get('phoneNumber')?.setValue(data?.phoneNumber)
				this.avatar = data?.photoURL
			}
		});
	}
	onSubmit() {
		this.auth.updateDisplayName(this.form.get('displayName')?.value).then( () => {
			this._snackBar.open('Update successful', 'OK', {
				horizontalPosition: 'center',
				verticalPosition: 'top',
				duration: 50000,
				panelClass: ['success-snackbar'],
			});
		})
	}
}
