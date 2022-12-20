import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DurationEnum } from 'src/app/shared/enums/duration.enum';

@Component({
	selector: 'app-limit-exceeded',
	templateUrl: './limit-exceeded.component.html',
	styleUrls: ['./limit-exceeded.component.scss'],
})
export class LimitExceededComponent implements OnInit {
	constructor(private readonly _route: ActivatedRoute) {}
	public duration: DurationEnum = DurationEnum.Week;
	public limit = 0;
	ngOnInit(): void {
		const params = this._route.snapshot.queryParams;
		this.duration = this.translateDuration(params['duration']);
		this.limit = params['limit'];
	}

	generateDurationText() {
		return this.duration === DurationEnum.Day ? 'tym dniu' : 'tym tygodniu';
	}

	translateDuration(duration: string): DurationEnum {
		if (duration === 'Day') return DurationEnum.Day;
		return DurationEnum.Week;
	}
}
