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
import { ConfirmRegistrationService } from './confirm-registration.service';

@Component({
	selector: 'app-confirm-registration',
	templateUrl: './confirm-registration.component.html',
	styleUrls: ['./confirm-registration.component.scss'],
})
export class ConfirmRegistrationComponent implements OnInit {
	public codeLenght = 6;
	@ViewChildren('codeInput') codeInputs!: QueryList<ElementRef>;
	public email = '';
	public form: FormGroup;

	constructor(
		private readonly _route: ActivatedRoute,
		private readonly _router: Router,
		private readonly _confirmRegistrationService: ConfirmRegistrationService,
		private readonly _toastrService: ToastrService
	) {
		this.form = new FormGroup({});
		for (let i = 0; i < this.codeLenght; i++) {
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
		const params = this._route.snapshot.paramMap;
		if (params.get('email') !== null) {
			this.email = params.get('email') ?? '';
		} else {
			this._router.navigate(['/public/home']);
		}
	}

	handleInputChange(inputId: number) {
		const inputValue = this.form.get(`codeInput${inputId}`)?.value;
		const inputValueAsString = String(inputValue);
		if (inputValue === null) {
			if (inputId !== 0) {
				this.codeInputs.get(inputId - 1)?.nativeElement.focus();
			}
		} else {
			if (inputValueAsString.length === this.codeLenght) {
				for (let i = 0; i < this.codeLenght; i++) {
					this.form
						.get(`codeInput${i}`)
						?.setValue(Number(inputValueAsString.charAt(i)));
				}
				this.codeInputs.get(this.codeLenght - 1)?.nativeElement.focus();
			} else if (inputValueAsString.length !== 1) {
				this.form
					.get(`codeInput${inputId}`)
					?.setValue(
						Number(inputValueAsString.slice(inputValueAsString.length - 1))
					);
			}
			if (inputId !== this.codeLenght - 1 && inputValueAsString.length !== 6) {
				this.codeInputs.get(inputId + 1)?.nativeElement.focus();
			}
		}
	}

	handleResendEmail() {
		this._confirmRegistrationService
			.resendRegistrationCode(this.email)
			.subscribe(() => {
				this._toastrService.success(
					'Sprawdź swoją skrzynkę odbiorcząF',
					'Sukces:'
				);
			});
	}

	handleSubmit() {
		if (this.form.valid) {
			let result = '';
			for (let i = 0; i < this.codeLenght; i++) {
				result += this.form.get(`codeInput${i}`)?.value;
			}
			this._confirmRegistrationService
				.validateRegistrationCode(result, this.email)
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
}
