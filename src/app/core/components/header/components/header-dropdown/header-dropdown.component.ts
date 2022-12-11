import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserClaims } from '../../../../models/user-claims.model';
import { ThemeService } from '../../../../services/theme.service';
import { UserDataService } from '../../../../services/user-data.service';

@Component({
	selector: 'app-header-dropdown',
	templateUrl: './header-dropdown.component.html',
	styleUrls: ['./header-dropdown.component.scss'],
})
export class HeaderDropdownComponent {
	user$: Observable<IUserClaims | null> = this._userDataService.getUserData$();
	isDarkTheme$: Observable<boolean> = this._themeService.isDark$();

	constructor(
		private readonly _themeService: ThemeService,
		private readonly _userDataService: UserDataService
	) {}

	handleThemeChange(): void {
		this._themeService.toggleTheme();
	}

	handleLogout(): void {
		this._userDataService.clearUserData();
	}
}
