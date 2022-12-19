import { AnswersApiService } from './services/answers-api.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { IQuestionDetailsEntity } from './models/question-details.dto';
import { QuestionDetailsApiService } from './services/question-details-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { IUserClaims } from 'src/app/core/models/user-claims.model';
import { IAnswerDetails } from './models/answer-details.dto';
import { AnswerFormMode } from './enums/answer-form-mode.enum';
import { BehaviorSubject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
	selector: 'app-question-details',
	templateUrl: './question-details.component.html',
	styleUrls: ['./question-details.component.scss'],
})
export class QuestionDetailsComponent implements OnInit {
	public question: IQuestionDetailsEntity | null = null;
	public user: IUserClaims | null = null;
	public isAnswerFormVisible = false;
	public answers: IAnswerDetails[] | null = null;
	public answerFormMode = AnswerFormMode;
	public page = 1;
	public pageSize = 5;
	public pageBehavior = new BehaviorSubject<number>(this.page);

	constructor(
		private readonly _questionDetailsApiService: QuestionDetailsApiService,
		private readonly _toastrService: ToastrService,
		private readonly _router: Router,
		private readonly _route: ActivatedRoute,
		private readonly _userDataService: UserDataService,
		private readonly _answersApiService: AnswersApiService,
		private readonly _location: Location
	) {}

	ngOnInit(): void {
		const queryParams = this._route.snapshot.queryParams;
		this.page = queryParams['page'] ?? 1;
		this.pageBehavior = new BehaviorSubject<number>(this.page);
		this.user = this._userDataService.getUserData();
		this._route.paramMap.subscribe((params) => {
			const idQuestionParam = params.get('idQuestion');
			if (!idQuestionParam) {
				this._toastrService.error('Błąd', 'Zasób nie istnieje');
				this._router.navigate(['/page-not-found']);
				return;
			}
			const idQuestion = Number(idQuestionParam);
			this._questionDetailsApiService.getQuestionDetails(idQuestion).subscribe({
				next: (res) => {
					this.question = res.body?.questionDetails ?? null;
					this._questionDetailsApiService.updateViews(idQuestion!).subscribe();
				},
				error: (err) => {
					if (err.status === 404) {
						this._toastrService.error('Błąd', 'Zasób nie istnieje');
						this._router.navigate(['/page-not-found']);
					}
				},
			});
			this.getAnswers(idQuestion);
		});
	}

	showAnswerForm(): void {
		this.isAnswerFormVisible = !this.isAnswerFormVisible;
	}

	getAnswers(idQuestion: number): void {
		const params = new HttpParams().append('page', this.page);
		this._location.replaceState(
			`/public/questions/${idQuestion}`,
			params.toString()
		);
		this.answers = null;
		this._answersApiService.getAnswers(idQuestion, this.page).subscribe({
			next: (res) => (this.answers = res.body?.answers ?? []),
		});
	}

	public handlePageChanged(page: number) {
		this.page = page;
		this.pageBehavior.next(this.page);
		this.getAnswers(this.question!.id);
	}
}
