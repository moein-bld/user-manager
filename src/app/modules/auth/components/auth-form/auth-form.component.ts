import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/shared/services/auth/user';

@Component({
	selector: 'app-auth-form',
	templateUrl: './auth-form.component.html',
	styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
	constructor(private router: Router, private fb: FormBuilder) {
		this.error = '';
		this.type = 'in';
	}

	form: FormGroup = this.fb.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(6)]],
	});

	submit() {
		if (this.form.valid) {
			this.submitUser.emit(this.form.value);
		}
		// this.router.navigate(['/forgot-password']);
	}

	loginWithGoogle() {
		this.googleLogin.emit();
	}

	@Input() error: string | null;

	@Input() type: 'in' | 'up';

	@Output() submitUser = new EventEmitter<UserLogin>();

	@Output() googleLogin = new EventEmitter();
}
