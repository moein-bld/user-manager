import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserLogin } from 'src/app/shared/services/auth/user';
@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
	constructor(public authService: AuthService, private _snackBar: MatSnackBar, private router: Router) {}

	register(event: UserLogin) {
		console.log(event);

		this.authService.signUp(event.email, event.password);
	}

	loginWithLogin() {
		this.authService.loginWithGoogle();
	}
}
