import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
	selector: 'app-textarea',
	templateUrl: './textarea.component.html',
	styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent {
	@Input() label = '';
	@Input() hint = '';
	@Input() placeholder = '';
	@Input() control!: AbstractControl;
	@Input() showRequiredMarker = false;
	@Input() errors: { name: string | null; message: string }[] = [];
	isPasswordHidden = true;

	get formControl() {
		return this.control as FormControl;
	}
}
