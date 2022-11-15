import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';
import { IConfirmEmailRequestDTO } from './models/confirm-email.dto';
import { ConfirmEmailApiService } from './services/confirm-email-api.service';

@Component({
	selector: 'app-confirm-email',
	templateUrl: './confirm-email.component.html',
})
export class ConfirmEmailComponent implements OnInit {
	constructor(
		private readonly _confirmEmailApiService: ConfirmEmailApiService,
		private readonly _route: ActivatedRoute,
		private readonly _router: Router,
		private readonly _toastrService: ToastrService,
		private readonly _loader: LoaderService
	) {}

	ngOnInit(): void {
		this._loader.show();
		this._route.queryParams.subscribe((params) => {
			const email = params['email'];
			const token = params['token'];
			const confirmEmailRequestDTO: IConfirmEmailRequestDTO = {
				email: email,
				confirmationCode: token,
			};
			this._confirmEmailApiService
				.confirmEmail(confirmEmailRequestDTO)
				.pipe(finalize(() => this._loader.hide()))
				.subscribe({
					next: () => {
						this._toastrService.success('Email został potwierdzony', 'Sukces');
						this._router.navigate(['user/settings/security']);
					},
					error: (err) => {
						if (err.status === 409) {
							this._router.navigate(['/page-not-found']);
						}
					},
				});
		});
	}
}
