import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-main-email-content',
	templateUrl: './main-email-content.component.html',
	styleUrls: [
		'./main-email-content.component.scss',
		'./../../styles/security-settings-component-style.scss',
	],
})
export class MainEmailContentComponent {
	isFormVisible = false;
	form: FormGroup;

	constructor() {
		this.form = new FormGroup({
			email: new FormControl('', [
				Validators.required,
				Validators.pattern('^.+@.+\\..+$'),
				Validators.maxLength(320),
			]),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(30),
				Validators.pattern('^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+).*$'),
			]),
		});
	}

	changeVisibilityForm() {
		this.isFormVisible = !this.isFormVisible;
	}

	sendForm() {
		this.form.markAllAsTouched();
		if (this.form.invalid) return;
	}
}
