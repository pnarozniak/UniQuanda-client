import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ConflictResponseStatus } from '../../enums/conflict-response-status.enum';
import { IDeleteExtraEmailRequestDTO } from '../../models/delete-extra-email-request.dto';
import { IUserEmailValue } from '../../models/get-user-emails-reponse.dto';
import { SecuritySettingsApiService } from '../../services/security-settings-api.service';
import { ScrollToElementFeatureComponent } from '../scroll-to-element-feature/scroll-to-element-feature.component';

@Component({
	selector: 'app-delete-extra-email-form',
	templateUrl: './delete-extra-email-form.component.html',
	styleUrls: [
		'./delete-extra-email-form.component.scss',
		'./../../styles/security-settings-component-style.scss',
	],
})
export class DeleteExtraEmailFormComponent extends ScrollToElementFeatureComponent {
	@Input() extraEmail: IUserEmailValue | null = null;

	isDeleteFormVisibility = false;
	form: FormGroup;

	constructor(
		private readonly _securitySettingsApiService: SecuritySettingsApiService,
		private readonly _toastrService: ToastrService,
		private readonly _loader: LoaderService,
		private readonly _router: Router
	) {
		super();
		this.form = new FormGroup({
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(30),
				Validators.pattern('^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+).*$'),
			]),
		});
	}

	changeVisibilityDeleteForm(): void {
		this.isDeleteFormVisibility = !this.isDeleteFormVisibility;
		super.scrollToEl();
	}

	sendForm(): void {
		this.form.markAllAsTouched();
		if (this.form.invalid) return;

		this._loader.show();
		const request: IDeleteExtraEmailRequestDTO = {
			idExtraEmail: this.extraEmail!.idEmail,
			password: this.form.get('password')?.value,
		};

		this._securitySettingsApiService
			.deleteExtraEmail(request)
			.pipe(finalize(() => this._loader.hide()))
			.subscribe({
				next: () => {
					this._toastrService.success(
						'Dodatkowy e-mail został usunięty',
						'Sukces'
					);
					const currentUrl = this._router.url;
					this._router
						.navigateByUrl('/', { skipLocationChange: true })
						.then(() => this._router.navigate([currentUrl]));
				},
				error: (req) => {
					if (req.status === 404) {
						this._toastrService.error('Zasób nie istnieje', 'Błąd');
						const currentUrl = this._router.url;
						this._router
							.navigateByUrl('/', { skipLocationChange: true })
							.then(() => this._router.navigate([currentUrl]));
					} else if (req.status === 409) {
						if (req.error.status === ConflictResponseStatus.InvalidPassword) {
							this.form.get('password')?.setErrors({ invalidPassword: true });
						} else if (req.error.status === ConflictResponseStatus.DbConflict) {
							this._toastrService.error('Błąd przetwarzania danych', 'Błąd');
						}
					}
				},
			});
	}
}
