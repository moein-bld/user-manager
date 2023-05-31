import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserLogin } from 'src/app/shared/services/user';
@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
	constructor(private authService: AuthService, private _snackBar: MatSnackBar) {}
	
	register(event: UserLogin) {
		console.log(event);

		this.authService
			.signUp(event.email, event.password)
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
}
