import { Component, Input } from '@angular/core';
import { DialogService } from 'src/app/core/services/dialog.service';
import { IGetUserEmailsReponseDTO } from '../../models/get-user-emails-reponse.dto';
import { ConfirmEmailInfoDialogComponent } from '../confirm-email-info-dialog/confirm-email-info-dialog.component';
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

	constructor(private readonly _dialogService: DialogService) {
		super();
	}
	isFormVisible = false;

	changeVisibilityForm() {
		if (!this.isFormVisible && this.userEmails?.emailToConfirm) {
			this._dialogService.open(ConfirmEmailInfoDialogComponent, {
				data: {
					email: this.userEmails.emailToConfirm.value,
					isBasicTitle: false,
				},
			});
		} else {
			this.isFormVisible = !this.isFormVisible;
			super.scrollToEl();
		}
	}
}
