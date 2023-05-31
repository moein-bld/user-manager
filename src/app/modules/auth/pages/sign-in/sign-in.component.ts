import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserLogin } from 'src/app/shared/services/user';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
	constructor(public authService: AuthService, private _snackBar: MatSnackBar) {}

	login(event: UserLogin) {
		console.log(event);

		this.authService
			.signIn(event.email, event.password)
			.pipe(
				catchError(error => {
					console.log(error.code);

					this._snackBar.open(`${error.code.split('/')[1]}`, 'OK', {
						horizontalPosition: 'center',
						verticalPosition: 'top',
						duration: 50000,
						panelClass: ['red-snackbar'],
					});

					return error;
				}),
			)
			.subscribe(data => {
				console.log(data);
			});
	}

	loginWithLogin() {
		
	}
}
