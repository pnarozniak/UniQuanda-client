import { ICreatePremiumPaymentRequestDTO } from './../../models/create-premium-payment.dto';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/core/services/loader.service';
import { IPremiumPaymentsResponseDTO } from '../../models/premium-payments.dto';
import { PremiumSettingsApiService } from '../../services/premium-settings-api.service';
import { finalize } from 'rxjs';
import { CreatePremiumPaymentResultEnum } from '../../enums/create-premium-payment-result.enum';

@Component({
	selector: 'app-premium-info',
	templateUrl: './premium-info.component.html',
	styleUrls: ['./premium-info.component.scss'],
})
export class PremiumInfoComponent {
	@Input() premiumInfo: IPremiumPaymentsResponseDTO | null = null;

	constructor(
		private readonly _premiumSettingsApiService: PremiumSettingsApiService,
		private readonly _toastrService: ToastrService,
		private readonly _loader: LoaderService,
		private readonly _router: Router
	) {}

	isDateBiggerThanNowPlusXMonths(
		xMonths: number,
		dateToCompare: Date
	): boolean {
		const nowDate = new Date();
		const newDate = new Date(nowDate.setMonth(nowDate.getMonth() + xMonths));
		return new Date(dateToCompare) > newDate;
	}

	callForPaymentUrl(isContinuationPremium: boolean): void {
		const request: ICreatePremiumPaymentRequestDTO = {
			isContinuationPremium: isContinuationPremium,
		};
		this._loader.show();
		this._premiumSettingsApiService
			.createPayment(request)
			.pipe(finalize(() => this._loader.hide()))
			.subscribe({
				next: (res) => {
					if (res.body?.paymentUrl) window.location.href = res.body?.paymentUrl;
				},
				error: (res) => {
					if (res.status === 404) {
						this._toastrService.error('Błąd', 'Zasób nie istnieje');
						this._router.navigate(['/page-not-found']);
					} else if (res.status === 409) {
						if (
							res.error.status === CreatePremiumPaymentResultEnum.PayUError ||
							res.error.status === CreatePremiumPaymentResultEnum.UnSuccessful
						) {
							this._toastrService.error('Spróbuj ponownie za chwilę', 'Błąd');
						} else if (
							res.error.status === CreatePremiumPaymentResultEnum.NotAllowed
						) {
							this._toastrService.error('Niedozwolona akcja', 'Blokada');
						}
					}
				},
			});
	}
}
