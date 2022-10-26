import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterApiService } from '../../services/register-api.service';
import { ToastrService } from 'ngx-toastr';
import { RegisterRequestDTO } from '../../models/register.dto';
import { LoaderService } from 'src/app/core/services/loader.service';
import { finalize } from 'rxjs';
import { FormsValidationService } from 'src/app/shared/services/forms-validation.service';

@Component({
	selector: 'app-register-second-step',
	templateUrl: './register-second-step.component.html',
	styleUrls: ['./register-second-step.component.scss'],
})
export class RegisterSecondStepComponent implements OnInit {
	public form: FormGroup = new FormGroup({
		firstName: new FormControl('', [Validators.maxLength(35)]),
		lastName: new FormControl('', [Validators.maxLength(51)]),
		birthdate: new FormControl('', [
			this._formsValidationService.checkIfDateBeforeNow,
		]),
		phoneNumber: new FormControl('', [Validators.maxLength(22)]),
		city: new FormControl('', [Validators.maxLength(57)]),
	});
	public nickname = '';
	public password = '';
	public email = '';

	constructor(
		private readonly _route: ActivatedRoute,
		private readonly _router: Router,
		private readonly _registerApiService: RegisterApiService,
		private readonly _formsValidationService: FormsValidationService,
		private readonly _toastrService: ToastrService,
		private readonly _loader: LoaderService
	) {}

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

	handleRegister() {
		this.form.markAllAsTouched();
		if (this.form.invalid) return;

		this._loader.show();
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
			.pipe(finalize(() => this._loader.hide()))
			.subscribe({
				next: () => {
					this._router.navigate([
						'/public/confirm-registration',
						{ email: this.email },
					]);
				},
				error: (error) => {
					if (error.status === 409) {
						this._toastrService.error(
							'Ktoś właśnie zarejestrował się podobnymi danymi, spróbuj ponownie',
							'Błąd'
						);
					}
				},
			});
	}
}
