import { Injectable } from '@angular/core';
import {
	AbstractControl,
	AsyncValidatorFn,
	ValidationErrors,
} from '@angular/forms';
import { finalize, Observable, of } from 'rxjs';
import { LoginApiService } from './login-api.service';

@Injectable({
	providedIn: 'root',
})
export class OAuthFormValidationService {
	constructor(private readonly _loginApiService: LoginApiService) {}

	/**
	 * Checks if username is available
	 * Sets nickname error `nicknameExists: true` if nickname is not available, otherwise clears error
	 * @param group form to validate
	 * @returns Observable of({pending: true})
	 */
	checkNicknameAvailability: AsyncValidatorFn = (
		group: AbstractControl
	): Observable<ValidationErrors | null> => {
		const nickname = group.get('nickname')?.value;
		if (nickname && group.get('nickname')?.valid) {
			this._loginApiService
				.isNicknameAvailable(nickname)
				.pipe(
					finalize(() => {
						group.setErrors(null);
					})
				)
				.subscribe((isAvailable) => {
					group
						.get('nickname')
						?.setErrors(isAvailable ? null : { nicknameExists: true });
				});
		}
		return of({ pending: true });
	};
}
