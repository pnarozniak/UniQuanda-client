import { IGetUserEmailsReponseDTO } from './../../models/get-user-emails-reponse.dto';
import { Component, Input } from '@angular/core';
import { ScrollToElementFeatureComponent } from '../scroll-to-element-feature/scroll-to-element-feature.component';

@Component({
	selector: 'app-password-content',
	templateUrl: './password-content.component.html',
	styleUrls: [
		'./password-content.component.scss',
		'./../../styles/security-settings-component-style.scss',
	],
})
export class PasswordContentComponent extends ScrollToElementFeatureComponent {
	@Input() userEmails: IGetUserEmailsReponseDTO | null = null;

	isFormVisible = false;

	changeVisibilityForm(value: boolean | null = null) {
		this.isFormVisible = value ?? !this.isFormVisible;
		super.scrollToEl();
	}
}
