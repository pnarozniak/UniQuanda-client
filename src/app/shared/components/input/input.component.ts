import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
})
export class InputComponent {
	@Input() label = '';
	@Input() control!: AbstractControl;
	@Input() type: 'text' | 'password' = 'text';
	@Input() hideRequiredMarker = false;
	@Input() errors: { name: string; message: string }[] = [];
	isPasswordHidden = true;

	get formControl() {
		return this.control as FormControl;
	}

	togglePassword() {
		this.isPasswordHidden = !this.isPasswordHidden;
	}
}
