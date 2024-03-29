import { UserDataService } from 'src/app/core/services/user-data.service';
import { Component } from '@angular/core';
import { IUserClaims } from '../../models/user-claims.model';
import { Observable } from 'rxjs';
import { Role } from '../../enums/role.enum';

@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
	user$: Observable<IUserClaims | null> = this._userDataService.getUserData$();

	constructor(public readonly _userDataService: UserDataService) {}

	public showAdminIcon(user: IUserClaims | null): boolean {
		return user?.roles.includes(Role.ADMIN) ?? false;
	}
}
