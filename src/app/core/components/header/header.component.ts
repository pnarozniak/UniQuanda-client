import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserClaims } from '../../models/user-claims.model';
import { UserDataService } from '../../services/user-data.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	user$: Observable<IUserClaims | null>;

	constructor(userDataService: UserDataService) {
		this.user$ = userDataService.getUserData$();
	}
}
