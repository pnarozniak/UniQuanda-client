import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
	selector: 'app-checkbox',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
	@Input() control!: AbstractControl;
	@Input() showRequiredMarker = false;
	@Input() errors: { name: string | null; message: string }[] = [];
	@Input() label = '';

	get formControl() {
		return this.control as FormControl;
	}

	public handleClick() {
		this.formControl.markAsTouched();
	}
}
