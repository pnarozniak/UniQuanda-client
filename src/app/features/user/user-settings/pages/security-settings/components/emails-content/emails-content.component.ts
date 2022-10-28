import { Component, Input } from '@angular/core';
import { IGetUserEmailsReponseDTO } from '../../models/get-user-emails-reponse.dto';

@Component({
	selector: 'app-emails-content',
	templateUrl: './emails-content.component.html',
	styleUrls: [
		'./emails-content.component.scss',
		'./../../styles/security-settings-component-style.scss',
	],
})
export class EmailsContentComponent {
	@Input() userEmails: IGetUserEmailsReponseDTO | null = null;

	isExtraEmailFormVisible = false;

	changeVisibilityForm(): void {
		this.isExtraEmailFormVisible = !this.isExtraEmailFormVisible;
	}
}
