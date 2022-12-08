import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IGetUserEmailsReponseDTO } from './models/get-user-emails-reponse.dto';
import { SecuritySettingsApiService } from './services/security-settings-api.service';

@Component({
	selector: 'app-security-settings',
	templateUrl: './security-settings.component.html',
	styleUrls: ['./security-settings.component.scss'],
})
export class SecuritySettingsComponent implements OnInit {
	userEmails: IGetUserEmailsReponseDTO | null = null;

	constructor(
		private readonly _securitySettingsApiService: SecuritySettingsApiService,
		private readonly _toastrService: ToastrService,
		private readonly _router: Router
	) {}

	ngOnInit(): void {
		this._securitySettingsApiService.getUserEmails().subscribe({
			next: (req) => {
				this.userEmails = req.body;
			},
			error: (req) => {
				if (req.status === 404) {
					this._toastrService.error('Błąd', 'Zasób nie istnieje');
					this._router.navigate(['/page-not-found']);
				}
			},
		});
	}
}
