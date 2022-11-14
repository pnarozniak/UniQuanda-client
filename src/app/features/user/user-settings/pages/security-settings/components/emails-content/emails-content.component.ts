import { Component, Input } from '@angular/core';
import { DialogService } from 'src/app/core/services/dialog.service';
import { IGetUserEmailsReponseDTO } from '../../models/get-user-emails-reponse.dto';
import { ConfirmEmailInfoDialogComponent } from '../confirm-email-info-dialog/confirm-email-info-dialog.component';
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

	constructor(private readonly _dialogService: DialogService) {
		super();
	}

	changeVisibilityForm(): void {
		this.isExtraEmailFormVisible = !this.isExtraEmailFormVisible;
		super.scrollToEl();
	}

	displayInfoEmailDialog(): void {
		this._dialogService.open(ConfirmEmailInfoDialogComponent, {
			data: {
				email: this.userEmails?.emailToConfirm?.value,
			},
		});
	}

	checkIfUserCanAddEmail(): boolean {
		if (this.userEmails?.emailToConfirm) {
			return this.userEmails?.extraEmails.length < 2;
		}
		return this.userEmails!.extraEmails.length < 3;
	}
}
