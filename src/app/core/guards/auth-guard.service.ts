import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDataService } from '../services/user-data.service';

@Injectable({ providedIn: 'root' })
export default class AuthGuardService implements CanActivate {
	constructor(
		private readonly _userDataService: UserDataService,
		private readonly _toastrService: ToastrService
	) {}

	canActivate(route: ActivatedRouteSnapshot): boolean {
		const claims = this._userDataService.getUserData();
		const expectedRole = route.data['expectedRole'];
		if (!claims) {
			this.displayUnauthorized();
			return false;
		}
		const canActivate = claims.roles.includes(expectedRole);
		if (!canActivate) {
			this.displayUnauthorized();
			return false;
		}
		return true;
	}

	displayUnauthorized() {
		this._toastrService.error(
			'Musisz się zalogować!',
			'Nieautoryzowany dostęp'
		);
	}
}
