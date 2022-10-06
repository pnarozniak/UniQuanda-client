import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
	providedIn: 'root',
})
export class DateValidationService {
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
