import { Component , OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription, catchError } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserLogin } from 'src/app/shared/services/auth/user';
@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnDestroy {
	private signInSubscription: Subscription = new Subscription();

	constructor(public authService: AuthService, private _snackBar: MatSnackBar, private router: Router) {}

	register(event: UserLogin) {
		console.log(event);

		this.authService.signUp(event.email, event.password).subscribe(
			userCredential => {
				// Handle sign-in success
				console.log('Sign-in successful:', userCredential.user);
				this.router.navigate(['/dashboard']);
			},
			error => {
				console.log(error.code);

				this._snackBar.open(`${error.code.split('/')[1]}`, 'OK', {
					horizontalPosition: 'center',
					verticalPosition: 'top',
					duration: 50000,
					panelClass: ['red-snackbar'],
				});

				return error;
			},
		);
	}

	loginWithLogin() {
		this.authService.loginWithGoogle();
	}

	ngOnDestroy() {
		// Unsubscribe from the Observable when the component is destroyed
		this.signInSubscription.unsubscribe();
	}
}
