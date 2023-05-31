import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'user-manager';

	constructor() {
		
	}

	public ngOnInit(): void {

		window.addEventListener('beforeinstallprompt', () => {
			console.log('show add to home screen button');
		});
		window.addEventListener('appinstalled', () => {
			console.log('app installed');
		});
	}
}
