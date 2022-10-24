import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
	providedIn: 'root',
})
export class FormsValidationService {
	/**
	 * Checks if date is before now
	 * @param group form to validate
	 * @returns ValidationErrors | null `before: true` if date is before now or
	 * null if date is after now
	 */
	checkIfDateBeforeNow: ValidatorFn = (
		group: AbstractControl
	): ValidationErrors | null => {
		const birthdate = group.value;
		if (birthdate === '' || birthdate === undefined) return null;
		const birthdateAsDate = new Date(group.value);
		return birthdateAsDate <= new Date() ? null : { before: true };
	};

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
}
