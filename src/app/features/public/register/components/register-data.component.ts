import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { plLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { RegisterValidationService } from '../services/register-validation.service';
import { ToastrService } from 'ngx-toastr';
import {
	RegisterResponseDTO,
	RegisterResponseStatus,
} from '../models/registerDTO';
defineLocale('pl', plLocale);

@Component({
	selector: 'app-register-data',
	templateUrl: './register-data.component.html',
	styleUrls: ['./register-data.component.scss'],
})
export class RegisterDataComponent implements OnInit {
	public form: FormGroup;
	public nickname = '';
	public password = '';
	public email = '';
	constructor(
		private readonly _route: ActivatedRoute,
		private readonly _router: Router,
		private readonly _registerService: RegisterService,
		private readonly _localeService: BsLocaleService,
		private readonly _registerValidationService: RegisterValidationService,
		private readonly _toastrService: ToastrService
	) {
		this._localeService.use('pl');
		this.form = new FormGroup({
			firstName: new FormControl('', [Validators.maxLength(35)]),
			lastName: new FormControl('', [Validators.maxLength(51)]),
			birthdate: new FormControl('', [
				this._registerValidationService.checkIfDateBeforeNow,
			]),
			phoneNumber: new FormControl('', [Validators.maxLength(22)]),
			city: new FormControl('', [Validators.maxLength(57)]),
		});
	}
	ngOnInit(): void {
		const params = this._route.snapshot.paramMap;
		if (
			params.get('nickname') !== null &&
			params.get('password') !== null &&
			params.get('email') !== null
		) {
			this.nickname = params.get('nickname') ?? '';
			this.password = params.get('password') ?? '';
			this.email = params.get('email') ?? '';
		} else {
			this._router.navigate(['/public/register']);
		}
	}

	handleRegister() {
		this.form.markAllAsTouched();
		console.log(this.form);
		if (this.form.valid) {
			this._registerService
				.register(
					this.nickname,
					this.password,
					this.email,
					this.form.value.firstName,
					this.form.value.lastName,
					this.form.value.birthdate,
					this.form.value.phoneNumber,
					this.form.value.city
				)
				.subscribe({
					next: (data: RegisterResponseDTO) => {
						if (data.status === RegisterResponseStatus.Success) {
							this._router.navigate([
								'/public/confirm-registration',
								{ email: this.email },
							]);
						} else {
							if (
								data.status === RegisterResponseStatus.NicknameAlreadyExists
							) {
								this._toastrService.error(
									'Ktoś właśnie zarejestrował taki nick, spróbuj ponownie',
									'Błąd'
								);
							} else if (
								data.status === RegisterResponseStatus.EmailAlreadyExists
							) {
								this._toastrService.error(
									'Ktoś właśnie zarejestrował taki email, spróbuj ponownie',
									'Błąd'
								);
							}
						}
					},
				});
		}
	}
}
