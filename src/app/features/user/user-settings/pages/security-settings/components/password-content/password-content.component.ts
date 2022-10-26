import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-password-content',
	templateUrl: './password-content.component.html',
	styleUrls: ['./password-content.component.scss'],
})
export class PasswordContentComponent implements OnInit {
	isFormVisible = false;
	form: FormGroup;
	constructor() {
    this.form = new FormGroup(
      {
        nickname: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ]),
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
        repeatPassword: new FormControl('', [Validators.required]),
      },
      //this._registerValidationService.checkIfPasswordsMatch,
    );
  }

	ngOnInit(): void {}

	changeVisibilityForm() {
		this.isFormVisible = !this.isFormVisible;
	}

	sendForm() {}
}
