import { Component } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pl';

@Component({
	selector: 'app-ranking',
	templateUrl: './ranking.component.html',
	styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent {
	public moment = moment;
}
