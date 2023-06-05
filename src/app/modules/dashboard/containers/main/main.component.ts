import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
})
export class MainComponent {
	opened = true;

	constructor(private auth: AuthService) {}

	toggle() {
		this.opened = !this.opened;
	}

	logout() {
		console.log('logout');
		this.auth.logout();
	}
}
