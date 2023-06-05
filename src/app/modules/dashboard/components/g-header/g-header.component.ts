import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
	selector: 'app-g-header',
	templateUrl: './g-header.component.html',
	styleUrls: ['./g-header.component.scss'],
})
export class GHeaderComponent implements OnInit {
	user: string = 'moein';
	avatar: string = '';

	constructor(private userService: UsersService) {}

	ngOnInit() {
		this.getUser();
	}

	getUser() {
		const authUser = this.userService.getUserFromLocalStorage();
		this.user = authUser.displayName;
		this.avatar = authUser.avatarFullPath;
	}

	@Output() menuToggled = new EventEmitter<boolean>();
}
