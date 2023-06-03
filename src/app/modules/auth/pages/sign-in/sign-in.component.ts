import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserLogin } from 'src/app/shared/services/auth/user';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
	constructor(public authService: AuthService, private _snackBar: MatSnackBar, private router: Router) {}

	login(event: UserLogin) {
		console.log(event);

		this.authService.signIn(event.email, event.password);
	}

	loginWithLogin() {
		this.authService.loginWithGoogle();
	}
}
