import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import AcademicTitle from '../../models/acedemic-title';
import { UserProfileResponseDTO } from '../../models/user-profile.dto';

@Component({
	selector: 'app-user-profile-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	@Input()
	public $user!: BehaviorSubject<UserProfileResponseDTO | null>;
	public user: UserProfileResponseDTO | null;

	constructor() {
		this.user = null;
	}

	ngOnInit(): void {
		this.$user.subscribe((user) => {
			this.user = user;
			console.log(user);
			if (user !== null) {
				console.log(
					AcademicTitle.getAcademicTitleTypeColor(
						user?.academicTitles[1].academicTitleType
					)
				);
			}
		});
	}
}
