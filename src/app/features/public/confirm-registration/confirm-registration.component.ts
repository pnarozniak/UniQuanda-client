import {
	Component,
	ElementRef,
	OnInit,
	QueryList,
	ViewChildren,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmRegistrationRequestDTO } from './models/confirm-registration.dto';
import { ConfirmRegistrationApiService } from './services/confirm-registration-api.service';

@Component({
	selector: 'app-confirm-registration',
	templateUrl: './confirm-registration.component.html',
	styleUrls: ['./confirm-registration.component.scss'],
})
export class ConfirmRegistrationComponent implements OnInit {
	public codeLength = 6;
	@ViewChildren('codeInput') codeInputs!: QueryList<ElementRef>;
	public email = '';
	public form: FormGroup;

	constructor(
		private readonly _route: ActivatedRoute,
		private readonly _router: Router,
		private readonly _confirmRegistrationApiService: ConfirmRegistrationApiService,
		private readonly _toastrService: ToastrService
	) {
		this.form = new FormGroup({});
		for (let i = 0; i < this.codeLength; i++) {
			this.form.addControl(
				`codeInput${i}`,
				new FormControl(null, [
					Validators.required,
					Validators.max(9),
					Validators.min(1),
				])
			);
		}
	}

	ngOnInit(): void {
		const email = this._route.snapshot.paramMap.get('email');
		if (email !== null) {
			this.email = email;
		} else {
			this._router.navigate(['/public/home']);
		}
	}

	handleInputChange(inputId: number) {
		const inputValue = this.form.get(`codeInput${inputId}`)?.value;
		const inputValueAsString = String(inputValue);
		if (inputValue === null && inputId !== 0) {
			return this.codeInputs.get(inputId - 1)?.nativeElement.focus();
		}
		if (inputValueAsString.length === this.codeLength) {
			for (let i = 0; i < this.codeLength; i++) {
				this.form
					.get(`codeInput${i}`)
					?.setValue(Number(inputValueAsString.charAt(i)));
			}
			this.codeInputs.get(this.codeLength - 1)?.nativeElement.focus();
		} else if (inputValueAsString.length !== 1) {
			this.form
				.get(`codeInput${inputId}`)
				?.setValue(
					Number(inputValueAsString.slice(inputValueAsString.length - 1))
				);
		}
		if (
			inputId !== this.codeLength - 1 &&
			inputValueAsString.length !== this.codeLength
		) {
			this.codeInputs.get(inputId + 1)?.nativeElement.focus();
		}
	}

	handleResendEmail() {
		this._confirmRegistrationApiService
			.resendRegistrationCode(this.email)
			.subscribe(() => {
				this._toastrService.success(
					'Sprawdź swoją skrzynkę odbiorczą',
					'Sukces:'
				);
			});
	}

	handleSubmit() {
		if (this.form.invalid) return;

		let result = '';
		for (let i = 0; i < this.codeLength; i++) {
			result += this.form.get(`codeInput${i}`)?.value;
		}
		this._confirmRegistrationApiService
			.validateRegistrationCode(
				new ConfirmRegistrationRequestDTO(result, this.email)
			)
			.subscribe((data) => {
				if (data.status === 204) {
					this._toastrService.success(
						'Twoje konto zostało aktywowane',
						'Sukces:'
					);
					this._router.navigate(['/public/login']);
				} else {
					this._toastrService.success('Taki kod nie istnieje', 'Błąd');
				}
			});
	}
}
