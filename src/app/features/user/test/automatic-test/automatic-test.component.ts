import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, forkJoin, Subscription } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ITag } from 'src/app/shared/models/tag.model';
import { IAutomaticTestQuestion } from './models/automatic-test-question.model';
import { IGetAutomaticTestResponseDTO } from './models/get-automatic-test.dto';
import { AutomaticTestApiService } from './services/automatic-test-api.service';

@Component({
	selector: 'app-automatic-test',
	templateUrl: './automatic-test.component.html',
	styleUrls: ['./automatic-test.component.scss'],
})
export class AutomaticTestComponent implements OnInit, OnDestroy {
	subscription = new Subscription();
	tags: ITag[] = [];
	test: IGetAutomaticTestResponseDTO | null = null;
	activeQuestion: IAutomaticTestQuestion | null = null;
	isMobileScreen = false;

	@ViewChild('questionRef') questionRef?: ElementRef;

	constructor(
		private loader: LoaderService,
		private route: ActivatedRoute,
		private automaticTestApi: AutomaticTestApiService,
		private router: Router,
		private toastr: ToastrService,
		private breakpointObserver: BreakpointObserver
	) {}

	ngOnInit(): void {
		const tagIds = this.route.snapshot.queryParams['tagIds']?.split(',');
		if (!tagIds || tagIds.length === 0) {
			this.router.navigate(['/user/test']);
			return;
		}

		this.loadTestData(tagIds);
		this.subscription.add(this.checkIsMobileScreen());
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	loadTestData(tagIds: []) {
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

	checkIsMobileScreen() {
		return this.breakpointObserver
			.observe(['(max-width: 991px)'])
			.subscribe((x) => {
				this.isMobileScreen = x.matches;
			});
	}

	scrollToQuestion() {
		if (!this.isMobileScreen) return;

		setTimeout(() => {
			this.questionRef?.nativeElement?.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}, 0);
	}

	getActiveQuestionIndex() {
		return this.test?.questions.findIndex(
			(q) => q.id === this.activeQuestion?.id
		);
	}

	changeQuestion(mode: 'next' | 'prev') {
		const index = this.getActiveQuestionIndex();
		if (!index && index !== 0) return;

		const nextQuestion =
			this.test?.questions?.[index + (mode === 'next' ? 1 : -1)];
		if (!nextQuestion) return;

		this.activeQuestion = nextQuestion;
	}
}
