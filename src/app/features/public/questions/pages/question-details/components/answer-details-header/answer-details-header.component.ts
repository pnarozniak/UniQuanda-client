import { Router } from '@angular/router';
import { StaticImageSrc } from './../../../../../../../shared/enums/static-image-src.enum';
import { Component, Input } from '@angular/core';
import { IAnswerDetails } from '../../models/answer-details.dto';
import { AcademicTitleType } from 'src/app/shared/enums/academic-title-type.enum';
import { AnswersApiService } from '../../services/answers-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-answer-details-header',
	templateUrl: './answer-details-header.component.html',
	styleUrls: ['./answer-details-header.component.scss'],
})
export class AnswerDetailsHeaderComponent {
	@Input() answer!: IAnswerDetails;
	@Input() idLoggedUser: number | null = null;
	@Input() answers: IAnswerDetails[] = [];
	@Input() isContentOwner = false;
	@Input() isQuestionAuthor = false;

	public staticImageSrc = StaticImageSrc;

	constructor(
		private readonly _answersApiService: AnswersApiService,
		private readonly _router: Router,
		private readonly _toastrService: ToastrService
	) {}

	getAcademicTitleTypeColor(type: AcademicTitleType) {
		switch (type) {
			case AcademicTitleType.Engineer:
				return '#1AA39D';
			case AcademicTitleType.Bachelor:
				return '#262B90';
			case AcademicTitleType.Academic:
				return '#FE4D10';
			default:
				return '#000000';
		}
	}

	markAnswer(): void {
		this._answersApiService.markAnswerAsCorrect(this.answer.id).subscribe({
			next: () => {
				const answer = this.answers.find((a) => a.isCorrect);
				if (answer) {
					this.answers.find((a) => a.isCorrect)!.isCorrect = false;
					if (answer.id !== this.answer.id) {
						this.answer.isCorrect = !this.answer.isCorrect;
					}
				} else {
					this.answer.isCorrect = !this.answer.isCorrect;
				}
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
}
