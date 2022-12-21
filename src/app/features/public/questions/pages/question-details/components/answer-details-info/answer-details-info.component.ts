import { finalize } from 'rxjs';
import { DialogService } from './../../../../../../../core/services/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit } from '@angular/core';
import { AnswerFormMode } from '../../enums/answer-form-mode.enum';
import { IAnswerDetails } from '../../models/answer-details.dto';
import { IUpdateAnswerLikeValueRequestDTO } from '../../models/update-answer-like-value.dto';
import { AnswersApiService } from '../../services/answers-api.service';
import { Router } from '@angular/router';
import { CreateAnAccountDialogComponent } from 'src/app/shared/components/dialogs/create-an-account-dialog/create-an-account-dialog.component';
import { ReportDialogComponent } from 'src/app/shared/components/dialogs/report-dialog/report-dialog.component';
import { IQuestionDetailsEntity } from '../../models/question-details.dto';

@Component({
	selector: 'app-answer-details-info',
	templateUrl: './answer-details-info.component.html',
	styleUrls: ['./answer-details-info.component.scss'],
})
export class AnswerDetailsInfoComponent implements OnInit {
	@Input() answer!: IAnswerDetails;
	@Input() idLoggedUser: number | null = null;
	@Input() isContentOwner = false;
	@Input() isQuestionAuthor = false;
	@Input() question!: IQuestionDetailsEntity;
	@Input() parentId: number | null = null;
	@Input() customId = '';

	public answerFormMode = AnswerFormMode;
	public isVisibleEditAnswerForm = false;
	public isLikeBtnClicked = false;
	public isAddCommentVisible = false;

	constructor(
		private readonly _answersApiService: AnswersApiService,
		private readonly _toastrService: ToastrService,
		private readonly _router: Router,
		private readonly _dialogService: DialogService
	) {
		this._router.routeReuseStrategy.shouldReuseRoute = () => false;
	}

	ngOnInit(): void {
		if (this.isContentOwner) this.isLikeBtnClicked = true;
	}

	changeVisibilityEditAnswerForm(): void {
		this.isVisibleEditAnswerForm = !this.isVisibleEditAnswerForm;
	}

	updateLikeValue(value: number): void {
		this.isLikeBtnClicked = true;
		if (!this.idLoggedUser) {
			this.isLikeBtnClicked = false;
			this._dialogService.open(CreateAnAccountDialogComponent);
			return;
		}

		const request: IUpdateAnswerLikeValueRequestDTO = {
			idAnswer: this.answer.id,
			likeValue: value,
		};
		this._answersApiService
			.updateAnswerLikeValue(request)
			.pipe(finalize(() => (this.isLikeBtnClicked = false)))
			.subscribe({
				next: (res) => {
					this.answer.userLikeValue = res.body!.likeValue;
					this.answer.likes = res.body!.likes;
				},
				error: (err) => {
					if (err.status === 404) {
						this._toastrService.error('Błąd', 'Zasób nie istnieje');
						const currentUrl = this._router.url;
						this._router
							.navigateByUrl('/', { skipLocationChange: true })
							.then(() => this._router.navigate([currentUrl]));
					} else if (err.status === 409) {
						this._toastrService.error('Błąd aktualizacji', 'Błąd');
					}
				},
			});
	}

	reportAnswer(): void {
		if (!this.idLoggedUser) {
			this._dialogService.open(CreateAnAccountDialogComponent);
		} else {
			this._dialogService.open(ReportDialogComponent, {
				data: { reportCategory: 'answer', reportedEntityId: this.answer.id },
			});
		}
	}

	deleteAnswer(): void {
		if (confirm('Czy napewno chcesz usunąć odpowiedź?')) {
			this._answersApiService.deleteAnswer(this.answer.id).subscribe({
				next: () => {
					this._toastrService.success('Pomyślnie usunięto odpowiedź', 'Sukces');
					const currentUrl = this._router.url;
					const splittedUrl = currentUrl.split('?');
					this._router
						.navigateByUrl('/', { skipLocationChange: true })
						.then(() =>
							this._router.navigate([splittedUrl[0]], {
								queryParams: {
									page: splittedUrl[1].split('&')[0].split('=')[1],
								},
							})
						);
				},
				error: (err) => {
					if (err.status === 404) {
						this._toastrService.error('Błąd', 'Zasób nie istnieje');
						const currentUrl = this._router.url;
						const splittedUrl = currentUrl.split('?');
						this._router
							.navigateByUrl('/', { skipLocationChange: true })
							.then(() =>
								this._router.navigate([splittedUrl[0]], {
									queryParams: {
										page: splittedUrl[1].split('&')[0].split('=')[1],
									},
								})
							);
					} else if (err.status === 409) {
						this._toastrService.error('Błąd aktualizacji', 'Błąd');
					}
				},
			});
		}
	}

	addComment(): void {
		this.isAddCommentVisible = !this.isAddCommentVisible;
	}
}
