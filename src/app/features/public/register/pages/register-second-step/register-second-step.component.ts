import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterApiService } from '../../services/register-api.service';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { plLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { RegisterRequestDTO } from '../../models/register.dto';
import { DateValidationService } from 'src/app/shared/services/date-validation.service';
defineLocale('pl', plLocale);

@Component({
	selector: 'app-register-second-step',
	templateUrl: './register-second-step.component.html',
	styleUrls: ['./register-second-step.component.scss'],
})
export class RegisterSecondStepComponent implements OnInit {
	public form: FormGroup;
	public nickname = '';
	public password = '';
	public email = '';
	constructor(
		private readonly _route: ActivatedRoute,
		private readonly _router: Router,
		private readonly _registerApiService: RegisterApiService,
		private readonly _localeService: BsLocaleService,
		private readonly _toastrService: ToastrService,
		private readonly _dateValidationService: DateValidationService
	) {
		this._localeService.use('pl');
		this.form = new FormGroup({
			firstName: new FormControl('', [Validators.maxLength(35)]),
			lastName: new FormControl('', [Validators.maxLength(51)]),
			birthdate: new FormControl('', [
				this._dateValidationService.checkIfDateBeforeNow,
			]),
			phoneNumber: new FormControl('', [Validators.maxLength(22)]),
			city: new FormControl('', [Validators.maxLength(57)]),
		});
	}
	ngOnInit(): void {
		const params = this._route.snapshot.paramMap;
		const nickname = params.get('nickname');
		const password = params.get('password');
		const email = params.get('email');
		if (!nickname || !email || !password) {
			this._router.navigate(['/public/register']);
		} else {
			this.nickname = nickname;
			this.password = password;
			this.email = email;
		}
	}

	hadneleDateChange(date: Date) {
		if (date?.toString() === 'Invalid Date') {
			this.form.get('birthdate')?.setErrors({ invalidFormat: true });
		}
	}

	handleRegister() {
		this.form.markAllAsTouched();
		if (this.form.invalid) return;

		this._registerApiService
			.register(
				new RegisterRequestDTO(
					this.nickname,
					this.password,
					this.email,
					this.form.value.firstName,
					this.form.value.lastName,
					this.form.value.birthdate,
					this.form.value.phoneNumber,
					this.form.value.city
				)
			)
			.subscribe((response) => {
				if (response.status === 201) {
					this._router.navigate([
						'/public/confirm-registration',
						{ email: this.email },
					]);
				} else if (response.status === 409) {
					this._toastrService.error(
						'Ktoś właśnie zarejestrował taki nick, spróbuj ponownie',
						'Błąd'
					);
				}
			});
	}
}
