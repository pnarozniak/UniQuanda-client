import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
	email = '';
	recoveryToken = '';

	constructor(
		private readonly _router: Router,
		private readonly _route: ActivatedRoute
	) {}

	ngOnInit(): void {
		const queryParams = this._route.snapshot.queryParamMap;
		const email = queryParams.get('email');
		const recoveryToken = queryParams.get('recoveryToken');
		if (email && recoveryToken) {
			this.email = email;
			this.recoveryToken = recoveryToken;
		} else {
			this._router.navigate(['/']);
		}
	}
}
