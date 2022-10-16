import { Injectable } from '@angular/core';
import {
	AbstractControl,
	AsyncValidatorFn,
	ValidationErrors,
	ValidatorFn,
} from '@angular/forms';
import { finalize, Observable, of } from 'rxjs';
import { RegisterApiService } from './register-api.service';

@Injectable({
	providedIn: 'root',
})
export class RegisterValidationService {
	constructor(private readonly _registerApiService: RegisterApiService) {}
	/**
	 * Checks if two passwords are equal.
	 * Sets repeatPassword error `notSame: true` if passwords are not equal, otherwise clears error
	 * @param group form to validate
	 * @returns null
	 */
	checkIfPasswordsMatch: ValidatorFn = (group: AbstractControl): null => {
		const pass = group.get('password')?.value;
		const confirmPass = group.get('repeatPassword')?.value;
		group
			.get('repeatPassword')
			?.setErrors(pass === confirmPass ? null : { notSame: true });
		return null;
	};

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
				.confirmRegistration(nickname, email)
				.pipe(
					finalize(() => {
						group.setErrors(null);
					})
				)
				.subscribe((response) => {
					const data = response.body;
					email.setErrors(
						data?.isEmailAvailable ? null : { emailExists: true }
					);
					nickname.setErrors(
						data?.isNicknameAvailable ? null : { nicknameExists: true }
					);
				});
		}
		return of({ pending: true });
	};

	/**
	 * Checks if birthdate is before now
	 * @param group form to validate
	 * @returns ValidationErrors | null `before: true` if birthdate is before now or
	 * null if birthdate is after now
	 */
	checkIfDateBeforeNow: ValidatorFn = (
		group: AbstractControl
	): ValidationErrors | null => {
		const birthdate = group.value;
		if (birthdate === '' || birthdate === undefined) return null;
		const birthdateAsDate = new Date(group.value);
		return birthdateAsDate <= new Date() ? null : { before: true };
	};
}
