import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateAnAccountDialogComponent } from 'src/app/shared/components/dialogs/create-an-account-dialog/create-an-account-dialog.component';
import { DialogService } from '../services/dialog.service';
import { UserDataService } from '../services/user-data.service';

@Injectable({ providedIn: 'root' })
export default class AuthGuardService implements CanActivate {
	constructor(
		private readonly _userDataService: UserDataService,
		private readonly _toastrService: ToastrService,
		private readonly _dialogService: DialogService
	) {}

	canActivate(route: ActivatedRouteSnapshot): boolean {
		const claims = this._userDataService.getUserData();
		const expectedRole = route.data['expectedRole'];
		if (!claims) {
			this._dialogService.open(CreateAnAccountDialogComponent);
			return false;
		}

		const canActivate = claims?.roles?.includes(expectedRole);
		if (!canActivate) {
			/* Propably in future should be changed to BuyPremiumDialogComponent */
			this.displayUnauthorized();
			return false;
		}
		return true;
	}

	displayUnauthorized() {
		this._toastrService.error(
			'Przepraszamy nie masz dostępu do tego zasobu',
			'Nieautoryzowany dostęp'
		);
	}
}
