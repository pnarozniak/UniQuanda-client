import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, forkJoin } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ITag } from 'src/app/shared/models/tag.model';
import {
	IAutomaticTestQuestion,
	IGetAutomaticTestResponseDTO,
} from './models/get-automatic-test.dto';
import { AutomaticTestApiService } from './services/automatic-test-api.service';

@Component({
	selector: 'app-automatic-test',
	templateUrl: './automatic-test.component.html',
	styleUrls: ['./automatic-test.component.scss'],
})
export class AutomaticTestComponent implements OnInit {
	tags: ITag[] = [];
	test: IGetAutomaticTestResponseDTO | null = null;
	activeQuestion: IAutomaticTestQuestion | null = null;

	constructor(
		private loader: LoaderService,
		private route: ActivatedRoute,
		private automaticTestApi: AutomaticTestApiService,
		private router: Router,
		private toastr: ToastrService
	) {}

	ngOnInit(): void {
		const tagIds = this.route.snapshot.queryParams['tagIds']?.split(',');
		if (!tagIds || tagIds.length === 0) {
			this.router.navigate(['/user/test']);
			return;
		}

		this.loader.show();
		forkJoin({
			tags: this.automaticTestApi.getTags$(tagIds),
			test: this.automaticTestApi.getAutomaticTest$(tagIds),
		})
			.pipe(finalize(() => this.loader.hide()))
			.subscribe(({ tags, test }) => {
				if (test.questions.length === 0) {
					this.router.navigate(['/user/test']);
					this.toastr.error(
						'Nie mogliśmy wygenerować testu z wybranych tagów. Zmień tagi i spróbuj ponownie.',
						'Przepraszamy'
					);
				} else {
					this.tags = tags;
					this.test = test;
					this.activeQuestion = test.questions[0];
				}
			});
	}
}
