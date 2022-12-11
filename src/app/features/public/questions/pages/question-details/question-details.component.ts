import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { IQuestionDetailsEntity } from './models/question-details.dto';
import { QuestionDetailsApiService } from './services/question-details-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { IUserClaims } from 'src/app/core/models/user-claims.model';

@Component({
	selector: 'app-question-details',
	templateUrl: './question-details.component.html',
	styleUrls: ['./question-details.component.scss'],
})
export class QuestionDetailsComponent implements OnInit {
	question: IQuestionDetailsEntity | null = null;
	user: IUserClaims | null = null;

	constructor(
		private readonly _questionDetailsApiService: QuestionDetailsApiService,
		private readonly _toastrService: ToastrService,
		private readonly _router: Router,
		private readonly _route: ActivatedRoute,
		private readonly _userDataService: UserDataService
	) {}

	ngOnInit(): void {
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
					this._questionDetailsApiService.updateViews(idQuestion).subscribe();
				},
				error: (err) => {
					if (err.status === 404) {
						this._toastrService.error('Błąd', 'Zasób nie istnieje');
						this._router.navigate(['/page-not-found']);
					}
				},
			});
		});
	}
}
