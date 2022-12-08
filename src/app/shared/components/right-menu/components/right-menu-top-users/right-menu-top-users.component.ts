import { Component } from '@angular/core';
import { RightMenuApiService } from '../../services/right-menu-api.service';

@Component({
	selector: 'app-right-menu-top-users',
	templateUrl: './right-menu-top-users.component.html',
	styleUrls: ['./right-menu-top-users.component.scss'],
})
export class RightMenuTopUsersComponent {
	top5Users$ = this._rightMenuApi.getTop5Users$();

	constructor(private readonly _rightMenuApi: RightMenuApiService) {}
}
