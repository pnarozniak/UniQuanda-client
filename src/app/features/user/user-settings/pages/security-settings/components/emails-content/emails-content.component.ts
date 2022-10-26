import { SecuritySettingsApiService } from '../../services/security-settings-api.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IGetUserEmailsReponseDTO } from '../../models/get-user-emails-reponse.dto';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
	selector: 'app-emails-content',
	templateUrl: './emails-content.component.html',
	styleUrls: ['./emails-content.component.scss'],
})
export class EmailsContentComponent {
	userEmails: IGetUserEmailsReponseDTO | null = null;
	isExtraEmailFormVisible = false;
	

	constructor(
		private readonly _securitySettingsApiService: SecuritySettingsApiService,
		private readonly _toastrService: ToastrService,
		private readonly _loader: LoaderService,
		private readonly _router: Router
	) {
		this._securitySettingsApiService.getUserEmails().subscribe({
			next: (req) => {
				this.userEmails = req.body;
			},
			error: () => {
				this._toastrService.error('Błąd ładowania strony', 'Błąd');
				this._router.navigate(['/public/home']);
			},
		});
	}

	changeVisibilityForm(): void {
		this.isExtraEmailFormVisible = !this.isExtraEmailFormVisible;
	}
}
