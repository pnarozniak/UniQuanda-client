import { Component } from '@angular/core';
import { Role } from 'src/app/core/enums/role.enum';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
	selector: 'app-settings-navigation',
	templateUrl: './settings-navigation.component.html',
	styleUrls: ['./settings-navigation.component.scss'],
})
export class SettingsNavigationComponent {
	userData$ = this.userDataService.getUserData$();
	roleEnum = Role;

	constructor(private userDataService: UserDataService) {}
}
