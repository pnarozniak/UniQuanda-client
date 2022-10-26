import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';
import { RecoverPasswordApiService } from '../../services/recover-password-api.service';

@Component({
	selector: 'app-recover-password-form',
	templateUrl: './recover-password-form.component.html',
	styleUrls: ['./recover-password-form.component.scss'],
})
export class RecoverPasswordFormComponent {
	@Output() afterRecover = new EventEmitter<void>();

	form: FormGroup = new FormGroup({
		email: new FormControl('', [
			Validators.required,
			Validators.pattern('^.+@.+\\..+$'),
			Validators.maxLength(320),
		]),
	});

	constructor(
		private readonly _passwordRecoveryApiService: RecoverPasswordApiService,
		private readonly _loader: LoaderService
	) {}

	handleRecoverPassword() {
		if (this.form.invalid) return;

		this._loader.show();
		this._passwordRecoveryApiService
			.recoverPassword(this.form.value.email)
			.pipe(finalize(() => this._loader.hide()))
			.subscribe(() => {
				this.afterRecover.emit();
			});
	}
}
