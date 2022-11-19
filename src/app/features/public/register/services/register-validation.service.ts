import { Injectable } from '@angular/core';
import {
	AbstractControl,
	AsyncValidatorFn,
	ValidationErrors,
} from '@angular/forms';
import { finalize, Observable, of } from 'rxjs';
import { RegisterApiService } from './register-api.service';

@Injectable({
	providedIn: 'root',
})
export class RegisterValidationService {
	constructor(private readonly _registerApiService: RegisterApiService) {}

	/**
	 * Checks if username and email are unique.
	 * Sets email error `emailExists: true` if email is not available, otherwise clears error
	 * Sets nickname error `nicknameExists: true` if nickname is not available, otherwise clears error
	 * @param group form to validate
	 * @returns Observable of({pending: true})
	 */
	checkNicknameAndEmailAvailability: AsyncValidatorFn = (
		group: AbstractControl
	): Observable<ValidationErrors | null> => {
		const nickname = group.get('nickname')?.value;
		const email = group.get('email')?.value;
		if (nickname && email) {
			this._registerApiService
				.isEmailAndNicknameAvailable(email, nickname)
				.pipe(
					finalize(() => {
						group.setErrors(null);
					})
				)
				.subscribe((response) => {
					const data = response.body;
					group
						.get('email')
						?.setErrors(data?.isEmailAvailable ? null : { emailExists: true });
					group
						.get('nickname')
						?.setErrors(
							data?.isNicknameAvailable ? null : { nicknameExists: true }
						);
				});
		}
		return of({ pending: true });
	};
}
