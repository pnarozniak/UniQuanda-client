import { Component, Input } from '@angular/core';
import { IGetUserEmailsReponseDTO } from '../../models/get-user-emails-reponse.dto';
import { ScrollToElementFeatureComponent } from '../scroll-to-element-feature/scroll-to-element-feature.component';

@Component({
	selector: 'app-emails-content',
	templateUrl: './emails-content.component.html',
	styleUrls: [
		'./emails-content.component.scss',
		'./../../styles/security-settings-component-style.scss',
	],
})
export class EmailsContentComponent extends ScrollToElementFeatureComponent {
	@Input() userEmails: IGetUserEmailsReponseDTO | null = null;

	isExtraEmailFormVisible = false;

	changeVisibilityForm(): void {
		this.isExtraEmailFormVisible = !this.isExtraEmailFormVisible;
		super.scrollToEl();
	}
}
