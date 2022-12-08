import { ThemeService } from 'src/app/core/services/theme.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IPremiumPaymentsResponseDTO } from './models/premium-payments.dto';
import { PremiumSettingsApiService } from './services/premium-settings-api.service';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
	selector: 'app-premium-settings',
	templateUrl: './premium-settings.component.html',
	styleUrls: ['./premium-settings.component.scss'],
})
export class PremiumSettingsComponent implements OnInit {
	public premiumInfo: IPremiumPaymentsResponseDTO | null = null;
	public isDarkMode: boolean | null = null;
	public displayBtnLoadMore = true;
	private readonly _basicNumberOfDisplaedPayments: number = 6;

	constructor(
		private readonly _premiumSettingsApiService: PremiumSettingsApiService,
		private readonly _toastrService: ToastrService,
		private readonly _router: Router,
		private readonly _themeService: ThemeService,
		private readonly _loader: LoaderService
	) {}

	ngOnInit(): void {
		this._themeService.isDark$().subscribe((isDark) => {
			this.isDarkMode = isDark;
		});
		this.getPayments(false);
	}

	getPayments(getAll: boolean) {
		this._premiumSettingsApiService
			.getPremiumPayments(getAll)
			.pipe(
				finalize(() => {
					if (getAll) this.displayBtnLoadMore = false;
					this._loader.hide();
				})
			)
			.subscribe({
				next: (req) => {
					this.premiumInfo = req.body;
					if (this.premiumInfo && !getAll) {
						this.displayBtnLoadMore =
							this.premiumInfo?.numberOfPayments >
							this._basicNumberOfDisplaedPayments;
					}
				},
				error: (req) => {
					if (req.status === 404) {
						this._toastrService.error('Błąd', 'Zasób nie istnieje');
						this._router.navigate(['/page-not-found']);
					}
				},
			});
	}

	getAllPayments(): void {
		this._loader.show();
		this.getPayments(true);
	}
}
