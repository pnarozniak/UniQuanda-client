import { BreakpointObserver } from '@angular/cdk/layout';
import {
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { finalize, Subscription } from 'rxjs';
import { DialogService } from 'src/app/core/services/dialog.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { TestFinishConfirmationDialogComponent } from './components/test-finish-confirmation-dialog/test-finish-confirmation-dialog.component';
import { IGetTestResponseDTO } from './models/get-test.dto';
import { ITestQuestion } from './models/test-question.model';
import { TestViewApiService } from './services/test-view-api.service';

@Component({
	selector: 'app-test-view',
	templateUrl: './test-view.component.html',
	styleUrls: ['./test-view.component.scss'],
})
export class TestViewComponent implements OnInit, OnDestroy {
	testId!: number;
	subscription = new Subscription();
	test: IGetTestResponseDTO | null = null;
	activeQuestion: ITestQuestion | null = null;
	isMobileScreen = false;
	moment = moment;

	@ViewChild('questionRef') questionRef?: ElementRef;

	constructor(
		private loader: LoaderService,
		private route: ActivatedRoute,
		private testViewApi: TestViewApiService,
		private router: Router,
		private breakpointObserver: BreakpointObserver,
		private dialog: DialogService
	) {}

	ngOnInit(): void {
		this.testId = Number(this.route.snapshot.params['idTest']);
		if (!this.testId) {
			this.router.navigate(['page-not-found']);
			return;
		}

		this.getTest();
		this.subscription.add(this.checkIsMobileScreen());
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	getTest() {
		this.loader.show();
		this.testViewApi
			.getTest$(this.testId)
			.pipe(finalize(() => this.loader.hide()))
			.subscribe({
				next: (test) => {
					this.test = test;
					this.activeQuestion = test.questions[0];
				},
				error: () => {
					this.router.navigate(['page-not-found']);
				},
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

	finishTest() {
		this.dialog.open(TestFinishConfirmationDialogComponent, {
			data: { idTest: this.testId },
		});
	}
}
