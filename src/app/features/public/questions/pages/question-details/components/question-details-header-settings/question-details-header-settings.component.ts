import { Router } from '@angular/router';
import { IQuestionDetailsEntity } from './../../models/question-details.dto';
import { Component, Input, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/core/services/dialog.service';
import { CreateAnAccountDialogComponent } from 'src/app/shared/components/dialogs/create-an-account-dialog/create-an-account-dialog.component';
import { ReportDialogComponent } from 'src/app/shared/components/dialogs/report-dialog/report-dialog.component';
import { QuestionDetailsApiService } from '../../services/question-details-api.service';
import { DeleteQuestionResultEnum } from '../../enums/delete-question-result.enum';

@Component({
	selector: 'app-question-details-header-settings',
	templateUrl: './question-details-header-settings.component.html',
	styleUrls: ['./question-details-header-settings.component.scss'],
	providers: [
		{
			provide: BsDropdownConfig,
			useValue: { autoClose: true },
		},
	],
})
export class QuestionDetailsHeaderSettingsComponent implements OnInit {
	@Input() question!: IQuestionDetailsEntity;
	@Input() idLoggedUser: number | null = null;
	@Input() isQuestionAuthor = false;

	public isEditQuestionPossible = false;
	public isDeleteQuestionPossible = false;

	constructor(
		private readonly _dialogService: DialogService,
		private readonly _questionDetailsApiService: QuestionDetailsApiService,
		private readonly _toastrService: ToastrService,
		private readonly _router: Router
	) {}

	ngOnInit(): void {
		this.isEditQuestionPossible =
			this.isQuestionAuthor && this.question.amountOfAnswers === 0;
		this.isDeleteQuestionPossible =
			this.isQuestionAuthor && this.question.amountOfAnswers === 0;
	}

	followQuestion(questionId: number) {
		if (this.idLoggedUser === null) {
			this._dialogService.open(CreateAnAccountDialogComponent);
			return;
		}
		this._questionDetailsApiService.followQuestion(questionId).subscribe({
			next: () =>
				(this.question.isQuestionFollowed = !this.question.isQuestionFollowed),
			error: () => this._toastrService.error('Błąd aktualizacji', 'Błąd'),
		});
	}

	reportQuestion(questionId: number) {
		if (!this.idLoggedUser) {
			this._dialogService.open(CreateAnAccountDialogComponent);
		} else {
			this._dialogService.open(ReportDialogComponent, {
				data: { reportCategory: 'question', reportedEntityId: questionId },
			});
		}
	}

	deleteQuestion(questionId: number) {
		this._questionDetailsApiService.deleteQuestion(questionId).subscribe({
			next: () => {
				this._toastrService.success('Pomyślnie usunięto pytanie', 'Sukces');
				this._router.navigate(['/public/home']);
			},
			error: (err) => {
				if (err.status === 404) {
					this._toastrService.error('Błąd', 'Zasób nie istnieje');
					this._router.navigate(['/page-not-found']);
				} else if (err.status === 409) {
					if (
						err.error.status === DeleteQuestionResultEnum.QuestionHasAnswers
					) {
						this._toastrService.success('Pytanie zawiera odpowiedzi', 'Błąd');
						const currentUrl = this._router.url;
						this._router
							.navigateByUrl('/', { skipLocationChange: true })
							.then(() => this._router.navigate([currentUrl]));
					} else if (
						err.error.status === DeleteQuestionResultEnum.UnSuccessful
					) {
						this._toastrService.error('Błąd', 'Błąd usuwania danych');
					}
				}
			},
		});
	}
}
