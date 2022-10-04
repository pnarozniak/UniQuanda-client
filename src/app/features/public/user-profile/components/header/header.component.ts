import { Component, Input, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserClaims } from 'src/app/core/models/user-claims.model';
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
export class HeaderComponent {
	@Input()
	public user$!: BehaviorSubject<UserProfileResponseDTO | null>;
	@Input()
	public userClaims$!: Observable<IUserClaims | null>;

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
