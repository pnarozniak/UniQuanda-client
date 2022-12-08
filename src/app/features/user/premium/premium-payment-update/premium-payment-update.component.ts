import { HandlePremiumPaymentStatusResultEnum } from './enums/handle-premium-payment-status-result.enum';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { PremiumPaymentUpdateApiService } from './services/premium-payment-update-api.service';

@Component({
	selector: 'app-premium-payment-update',
	templateUrl: './premium-payment-update.component.html',
})
export class PremiumPaymentUpdateComponent implements OnInit {
	constructor(
		private readonly _route: ActivatedRoute,
		private readonly _premiumPaymentUpdateApiService: PremiumPaymentUpdateApiService,
		private readonly _router: Router,
		private readonly _toastrService: ToastrService,
		private readonly _loader: LoaderService,
		private readonly _userDataService: UserDataService
	) {}

	ngOnInit(): void {
		this._route.queryParams.subscribe((params) => {
			const isError = params['error'];
			this._loader.show();
			this._premiumPaymentUpdateApiService
				.handlePremiumPayment()
				.pipe(finalize(() => this._loader.hide()))
				.subscribe({
					next: (req) => {
						if (req.body) {
							const userData = this._userDataService.getUserData();
							const data = {
								accessToken: req.body.accessToken ?? userData?.refreshToken,
								refreshToken: req.body.refreshToken ?? userData?.refreshToken,
							};
							this._userDataService.updateUserData(data);
							if (isError) {
								this._router.navigate(['/user/settings/premium']);
								this._toastrService.error(
									'Nie udało się dokonać płatności',
									'Niepowodzenie'
								);
								return;
							}
							this._toastrService.success(
								'Płatność zakończona sukcesem',
								'Sukces'
							);
							this._router.navigate(['/user/settings/premium']);
						}
					},
					error: (err) => {
						if (err.status === 404) {
							this._toastrService.error('Zasób nie istnieje', 'Błąd');
							this._router.navigate(['/']);
						} else if (err.status === 409) {
							if (
								err.error.status ===
								HandlePremiumPaymentStatusResultEnum.PaymentHasStatusNew
							) {
								this._router.navigate(['/user/settings/premium']);
							} else {
								this._toastrService.error(
									'Przetwarzamy twoją płatnośc',
									'Błąd serwisu'
								);
								this._router.navigate(['/user/settings/premium']);
							}
						}
					},
				});
		});
	}
}
