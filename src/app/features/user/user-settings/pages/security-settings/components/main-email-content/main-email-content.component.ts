import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IGetUserEmailsReponseDTO } from '../../models/get-user-emails-reponse.dto';
import { ScrollToElementFeatureComponent } from '../scroll-to-element-feature/scroll-to-element-feature.component';

@Component({
	selector: 'app-main-email-content',
	templateUrl: './main-email-content.component.html',
	styleUrls: [
		'./main-email-content.component.scss',
		'./../../styles/security-settings-component-style.scss',
	],
})
export class MainEmailContentComponent extends ScrollToElementFeatureComponent {
	@Input() userEmails: IGetUserEmailsReponseDTO | null = null;

	constructor(private readonly _toastrService: ToastrService) {
		super();
	}
	isFormVisible = false;

	changeVisibilityForm() {
		if (!this.isFormVisible && this.userEmails?.emailToConfirm) {
			this._toastrService.error(
				'Zmiana wymaga potwierdzenie innego e-maila',
				'Niedostępna akcja'
			);
		} else {
			this.isFormVisible = !this.isFormVisible;
			super.scrollToEl();
		}
	}
}
