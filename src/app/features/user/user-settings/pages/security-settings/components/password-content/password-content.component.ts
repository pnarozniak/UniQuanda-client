import { Component } from '@angular/core';

@Component({
	selector: 'app-password-content',
	templateUrl: './password-content.component.html',
	styleUrls: [
		'./password-content.component.scss',
		'./../../styles/security-settings-component-style.scss',
	],
})
export class PasswordContentComponent {
	isFormVisible = false;

	changeVisibilityForm(value: boolean | null = null) {
		this.isFormVisible = value ?? !this.isFormVisible;
	}
}
