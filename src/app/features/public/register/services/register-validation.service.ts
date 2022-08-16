import { Injectable } from '@angular/core';
import {
	AbstractControl,
	AsyncValidatorFn,
	ValidationErrors,
	ValidatorFn,
} from '@angular/forms';
import { first, map, Observable, of } from 'rxjs';
import { RegisterApiService } from './register.api.service';

@Injectable({
	providedIn: 'root',
})
export class RegisterValidationService {
	constructor(private readonly _registerApiService: RegisterApiService) {}
	/**
	 * Checks if two passwords are equal
	 * @param group form to validate
	 * @returns ValidationErrors | null `notSame: true` if passwords are not equal or
	 * null if passwords are equal
	 */
	checkIfPasswordsMatch: ValidatorFn = (
		group: AbstractControl
	): ValidationErrors | null => {
		const pass = group.get('password')?.value;
		const confirmPass = group.get('repeatPassword')?.value;
		return pass === confirmPass ? null : { notSame: true };
	};

	/**
	 * Checks if username and email are unique
	 * @param group form to validate
	 * @returns ValidationErrors | null `isNicknameAvailable: true` if nickname is not unique,
	 * `emailExists: true` if email is not unique or
	 * `isNicknameAvailable: true, emailExists: true` if both email and nickname is not unique or
	 * null if both email and nickname are unique
	 */
	checkNicknameAndEmailAvailability: AsyncValidatorFn = (
		group: AbstractControl
	): Observable<ValidationErrors | null> => {
		const nickname = group.get('nickname')?.value;
		const email = group.get('email')?.value;
		if (nickname && email) {
			return this._registerApiService
				.confirmRegistration(nickname, email)
				.pipe(
					map((response) => {
						const data = response.body;
						if (!data?.isNicknameAvailable && !data?.isEmailAvailable) {
							return { nicknameExists: true, emailExists: true };
						} else if (!data.isNicknameAvailable) {
							return { nicknameExists: true };
						} else if (!data.isEmailAvailable) {
							return { emailExists: true };
						}
						return null;
					})
				)
				.pipe(first());
		}
		return of(null);
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
