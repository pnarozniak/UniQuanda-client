import { Component, Input, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { BehaviorSubject } from 'rxjs';
import { AcademicTitleType } from '../../models/acedemic-title';
import { UserProfileResponseDTO } from '../../models/user-profile.dto';

@Component({
	selector: 'app-user-profile-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	providers: [
		{
			provide: BsDropdownConfig,
			useValue: { autoClose: true },
		},
	],
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
			this.user?.academicTitles.sort((a, b) => a.order - b.order);
		});
	}

	getAcademicTitleTypeColor(type: AcademicTitleType) {
		switch (type) {
			case AcademicTitleType.Engineer:
				return '#1AA39D';
			case AcademicTitleType.Bachelor:
				return '#262B90';
			case AcademicTitleType.Academic:
				return '#FE4D10';
			default:
				return '#000000';
		}
	}
}
