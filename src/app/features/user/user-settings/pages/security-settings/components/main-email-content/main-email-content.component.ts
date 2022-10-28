import { Component, Input } from '@angular/core';
import { IGetUserEmailsReponseDTO } from '../../models/get-user-emails-reponse.dto';

@Component({
	selector: 'app-main-email-content',
	templateUrl: './main-email-content.component.html',
	styleUrls: [
		'./main-email-content.component.scss',
		'./../../styles/security-settings-component-style.scss',
	],
})
export class MainEmailContentComponent {
	@Input() userEmails: IGetUserEmailsReponseDTO | null = null;

	isFormVisible = false;

	changeVisibilityForm() {
		this.isFormVisible = !this.isFormVisible;
	}
}
