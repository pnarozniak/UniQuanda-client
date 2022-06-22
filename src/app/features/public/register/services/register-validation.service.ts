import { Injectable } from '@angular/core';
import {
	AbstractControl,
	AsyncValidatorFn,
	ValidationErrors,
	ValidatorFn,
} from '@angular/forms';
import { first, map, Observable, of } from 'rxjs';
import { RegisterService } from './register.service';

@Injectable({
	providedIn: 'root',
})
export class RegisterValidationService {
	constructor(private readonly _registerService: RegisterService) {}
	/**
	 * Checks if two passwords are equal
	 * @param group formularz
	 * @returns ValidationErrors | null
	 */
	checkIfPasswordsMatch: ValidatorFn = (
		group: AbstractControl
	): ValidationErrors | null => {
		const pass = group.get('password')?.value;
		const confirmPass = group.get('repeatPassword')?.value;
		return pass === confirmPass ? null : { notSame: true };
	};

	/**
	 * Checks if username is unique
	 * @param group formularz
	 * @returns ValidationErrors | null
	 */
	checkIfUsernameAndEmailExistsAsync: AsyncValidatorFn = (
		group: AbstractControl
	): Observable<ValidationErrors | null> => {
		const nickname = group.get('nickname')?.value;
		const email = group.get('email')?.value;
		if (nickname && email) {
			return this._registerService
				.validateNicknameAndEmail(nickname, email)
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
	 * @param group formularz
	 * @returns ValidationErrors | null
	 */
	checkIfDateBeforeNow: ValidatorFn = (
		group: AbstractControl
	): ValidationErrors | null => {
		const birthdate = group.get('birthdate')?.value;
		if (birthdate === '' || birthdate === undefined) return null;
		console.log(birthdate);
		const birthdateAsDate = new Date(group.get('birthdate')?.value);
		return birthdateAsDate >= new Date() ? null : { before: false };
	};
}
