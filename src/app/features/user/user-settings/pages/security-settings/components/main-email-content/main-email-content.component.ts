import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-main-email-content',
	templateUrl: './main-email-content.component.html',
	styleUrls: ['./main-email-content.component.scss'],
})
export class MainEmailContentComponent implements OnInit {
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

	ngOnInit(): void {}

	changeVisibilityForm() {
		this.isFormVisible = !this.isFormVisible;
	}

	sendForm() {}
}
