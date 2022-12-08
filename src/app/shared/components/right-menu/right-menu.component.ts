import { Component, HostBinding, Input } from '@angular/core';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { Role } from '../../../core/enums/role.enum';

@Component({
	selector: 'app-right-menu',
	templateUrl: './right-menu.component.html',
	styleUrls: ['./right-menu.component.scss'],
})
export class RightMenuComponent {
	@HostBinding('class') class = 'app-right-menu';

	@Input() options: (
		| 'about'
		| 'create-an-account'
		| 'buy-premium'
		| 'top-users'
		| 'generate-test'
	)[] = [];

	user$ = this._userData.getUserData$();
	roleEnum = Role;

	constructor(private readonly _userData: UserDataService) {}
}
