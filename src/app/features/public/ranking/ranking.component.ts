import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
	selector: 'app-ranking',
	templateUrl: './ranking.component.html',
	styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent {
	public moment = moment;
}
