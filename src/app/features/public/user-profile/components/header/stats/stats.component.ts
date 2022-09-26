import { Component, Input } from '@angular/core';
import HeaderStatistics from '../../../models/header-statistics';

@Component({
	selector: 'app-user-profile-header-stats',
	templateUrl: './stats.component.html',
	styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
	@Input()
	public headerStatistics?: HeaderStatistics;
}
