import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/core/services/dialog.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { TestsDashboardApiService } from 'src/app/features/user/test/tests-dashboard/services/tests-dashboard-api.service';
import { ITag } from 'src/app/shared/models/tag.model';
import { CreateAnAccountDialogComponent } from '../../../dialogs/create-an-account-dialog/create-an-account-dialog.component';

@Component({
	selector: 'app-right-menu-generate-test',
	templateUrl: './right-menu-generate-test.component.html',
	styleUrls: ['./right-menu-generate-test.component.scss'],
})
export class RightMenuGenerateTestComponent {
	control = new FormControl('');
	selectedTags: ITag[] = [];

	constructor(
		private router: Router,
		private testsDashboardApi: TestsDashboardApiService,
		private loader: LoaderService,
		private toastr: ToastrService,
		private userData: UserDataService,
		private dialog: DialogService
	) {}

	generateTest() {
		if (!this.userData.getUserData()) {
			this.dialog.open(CreateAnAccountDialogComponent);
			return;
		}

		this.control.setErrors(
			this.selectedTags.length === 0 ? { required: true } : null
		);
		if (this.control.invalid) return;

		this.loader.show();
		this.testsDashboardApi
			.generateTest$(this.selectedTags.map((t) => t.id))
			.subscribe({
				next: (testId) => {
					this.router.navigate(['/user/test/', testId]);
				},
				error: () => {
					this.loader.hide();
					this.toastr.error(
						'Przepraszamy, nie mogliśmy wygenerować testu dla wybranych tagów.',
						'Błąd generowania testu.'
					);
				},
			});
	}
}
