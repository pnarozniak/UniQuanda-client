import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IAcademicTitleOfUser } from '../../models/academic-title-of-user.dto';

@Component({
	selector: 'app-title-order',
	templateUrl: './title-order.component.html',
	styleUrls: ['./title-order.component.scss'],
})
export class TitleOrderComponent implements OnInit, OnDestroy {
	public hasChanges = false;
	@Input() public userTitlesObservable!: Observable<IAcademicTitleOfUser[]>;
	@Output() public orderChanged = new EventEmitter<Map<number, number>>();

	public userTitles: IAcademicTitleOfUser[] = [];
	private readonly _subscription = new Subscription();

	ngOnDestroy(): void {
		throw new Error('Method not implemented.');
	}

	ngOnInit(): void {
		this._subscription.add(
			this.userTitlesObservable.subscribe((titles) => {
				const orderedTitles = titles.sort((t1, t2) => t1.order - t2.order);
				this.userTitles = orderedTitles;
			})
		);
	}
}
