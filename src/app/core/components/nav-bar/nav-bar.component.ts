import { UserDataService } from 'src/app/core/services/user-data.service';
import { Component } from '@angular/core';

@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
	constructor(public readonly _userDataService: UserDataService) {}
}
