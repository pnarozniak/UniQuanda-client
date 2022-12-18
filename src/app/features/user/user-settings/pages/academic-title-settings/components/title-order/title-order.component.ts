import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IAcademicTitleOfUser } from '../../models/academic-title-of-user.dto';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AcademicTitleType } from 'src/app/shared/enums/academic-title-type';
import TitleOrder from '../../models/title-order.dto';
import { AcademicTitleApiService } from '../../services/academic-title.api.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
	selector: 'app-title-order',
	templateUrl: './title-order.component.html',
	styleUrls: ['./title-order.component.scss'],
})
export class TitleOrderComponent implements OnInit, OnDestroy {
	public hasChanges = false;
	@Input() public userTitlesObservable!: Observable<IAcademicTitleOfUser[]>;

	public userTitles: IAcademicTitleOfUser[] = [];
	private readonly _subscription = new Subscription();

	constructor(
		private readonly _academicTitleApiService: AcademicTitleApiService,
		private readonly _toastrService: ToastrService,
		private readonly _loader: LoaderService
	) {}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}

	ngOnInit(): void {
		this._subscription.add(
			this.userTitlesObservable.subscribe((titles) => {
				const orderedTitles = titles.sort((t1, t2) => t1.order - t2.order);
				this.userTitles = orderedTitles;
			})
		);
	}

	drop(event: CdkDragDrop<IAcademicTitleOfUser[]>) {
		moveItemInArray(this.userTitles, event.previousIndex, event.currentIndex);
		if (event.previousIndex !== event.currentIndex) {
			this.hasChanges = true;
		}
	}

	getClassByTitle(title: IAcademicTitleOfUser): string {
		switch (title.type) {
			case AcademicTitleType.Bachelor:
				return 'bachelor';
			case AcademicTitleType.Engineer:
				return 'engineer';
			case AcademicTitleType.Academic:
				return 'academic';
			default:
				return '';
		}
	}

	public handleSaveOrder() {
		if (!this.hasChanges) return;
		const requestMap: TitleOrder[] = [];
		this.userTitles.forEach((title, index) => {
			requestMap.push(new TitleOrder(title.titleId, index));
		});
		this._loader.show();
		this._academicTitleApiService
			.setOrderOfTitles(requestMap)
			.subscribe((response) => {
				this._loader.hide();
				this.hasChanges = false;
				if (response) {
					this._toastrService.success('Kolejność została zapisana', 'Sukces');
					this.hasChanges = false;
				} else {
					this._toastrService.error('Coś poszło nie tak', 'Błąd');
				}
			});
	}
}
