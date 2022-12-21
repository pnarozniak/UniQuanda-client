import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ITag } from 'src/app/shared/models/tag.model';
import { TestsDashboardApiService } from './services/tests-dashboard-api.service';

@Component({
	selector: 'app-tests-dashboard',
	templateUrl: './tests-dashboard.component.html',
	styleUrls: ['./tests-dashboard.component.scss'],
})
export class TestsDashboardComponent {
	tagsControl = new FormControl('');
	selectedTags: ITag[] = [];

	constructor(
		private testsDashboardApi: TestsDashboardApiService,
		private router: Router,
		private toastr: ToastrService,
		private loader: LoaderService
	) {}

	generateTest() {
		this.tagsControl.setErrors(
			this.selectedTags.length === 0 ? { required: true } : null
		);
		if (this.tagsControl.invalid) return;

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
