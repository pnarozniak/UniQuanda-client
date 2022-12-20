import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, finalize } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';
import { DurationEnum } from 'src/app/shared/enums/duration.enum';
import { ITag } from 'src/app/shared/models/tag.model';
import AddQuestionRequestDTO from './models/add-question.dto';
import { IUpdateQuestionRequestDTO } from './models/update-question.dto';
import AskQuestionApiService from './services/ask-question-api.service';

@Component({
	selector: 'app-ask-question',
	templateUrl: './ask-question.component.html',
	styleUrls: ['./ask-question.component.scss'],
})
export class AskQuestionComponent implements OnInit {
	public form = new FormGroup({
		title: new FormControl('', [
			Validators.required,
			Validators.minLength(5),
			Validators.maxLength(300),
		]),
		content: new FormControl('', [Validators.required]),
		confirmation: new FormControl(false, [Validators.requiredTrue]),
	});
	public maxTagsAmount = 5;
	public finishedInitialLoading = false;
	public editMode = false;
	private idQuestion: number | null = null;

	public constructor(
		private readonly _askQuestionApiService: AskQuestionApiService,
		private readonly _router: Router,
		private readonly _toastrService: ToastrService,
		private readonly _loaderService: LoaderService,
		private readonly _route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this._route.data.subscribe((data: any) => {
			if (data.question) {
				this.editMode = true;
				this.form.setValue({
					title: data.question.title,
					content: data.question.rawText,
					confirmation: false,
				});
				this.idQuestion = data.question.id;
				this.tags = data.question.tags;
				this.initialTags = of(this.tags);
			} else {
				this._askQuestionApiService.checkLimits().subscribe({
					next: (response) => {
						if (!response.maxTimes || !response.usedTimes) {
							this.finishedInitialLoading = true;
							return;
						}
						if (response.maxTimes <= response.usedTimes) {
							this.finishedInitialLoading = true;
							this._router.navigate(['/user/ask-question/limit-exceeded'], {
								queryParams: {
									duration: this.translateDuration(
										response.shortestRefreshPeriod as DurationEnum
									),
									limit: response.maxTimes,
								},
							});
							return;
						}
						this.finishedInitialLoading = true;
					},
				});
			}
		});
	}

	public tagInput = new FormControl('');
	public tags: ITag[] = [];
	public initialTags: Observable<ITag[]> = of();

	public handleAsk() {
		this.form.markAllAsTouched();
		this.tagInput.markAsTouched();
		this.tagInput.setErrors({ requiredTags: null });
		this.tagInput.updateValueAndValidity();
		if (this.tags.length === 0) {
			this.tagInput.setErrors({ requiredTags: true });
			return;
		}
		if (this.form.invalid) return;
		this._loaderService.show();
		const value = this.form.value;
		const request = new AddQuestionRequestDTO(
			value.content,
			this.tags.map((t) => t.id),
			value.title,
			value.confirmation
		);
		this._askQuestionApiService.addQuestion(request).subscribe({
			next: (questionId) => {
				this._toastrService.success(
					'Pomyślnie zadano pytanie',
					'Dodano pytanie'
				);
				this._loaderService.hide();
				this._router.navigate(['public/questions', questionId.body]);
			},
			error: (error) => {
				if ((error.status = 403)) {
					this._toastrService.error(
						'Nie możesz chwilowo zadawać kolejnych pytań',
						'Wyczerpano limit pytań'
					);
				} else {
					this._toastrService.error('Nie udało się dodać pytania', 'Błąd');
				}
			},
		});
	}

	public updateQuestion() {
		if (!this.idQuestion)
			this._toastrService.error('Chwilowo nie można zadać pytania', 'Błąd');

		this._loaderService.show();
		const value = this.form.value;
		const request: IUpdateQuestionRequestDTO = {
			idQuestion: this.idQuestion!,
			rawText: value.content,
			tagIds: this.tags.map((t) => t.id),
			title: value.title,
			confirmation: value.confirmation,
		};

		this._askQuestionApiService
			.updateQuestion(request)
			.pipe(finalize(() => this._loaderService.hide()))
			.subscribe({
				next: () => {
					this._toastrService.success(
						'Pomyślnie aktualizowano pytanie',
						'Sukces'
					);
					this._router.navigate(['public/questions', this.idQuestion]);
				},
				error: (err) => {
					if (err.status === 404) {
						this._toastrService.error('Błąd', 'Zasób nie istnieje');
						this._router.navigate(['/page-not-found']);
					} else if (err.status === 409) {
						this._toastrService.error(
							'Chwilowo nie można zadać pytania',
							'Błąd'
						);
					}
				},
			});
	}

	public setTags(tags: ITag[]) {
		this.tags = tags;
	}

	private translateDuration(duration: DurationEnum): string {
		if (duration === DurationEnum.Day) return 'Day';
		return 'Week';
	}
}
