import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDataService } from '../../services/user-data.service';

@Component({
	selector: 'app-logout',
	template: '',
})
export class LogoutComponent {
	constructor(
		private readonly _router: Router,
		private readonly _toastr: ToastrService,
		private readonly _userData: UserDataService
	) {
		this._userData.clearUserData();
		this._toastr.success('', 'Zostałeś wylogowany');
		this._router.navigate(['']);
	}
}
