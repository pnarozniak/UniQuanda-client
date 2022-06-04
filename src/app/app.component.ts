import { Component } from '@angular/core';
import { AppTitleService } from './app-title.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	constructor(private readonly _appTitleService: AppTitleService) {
		this._appTitleService.manageTitleChange();
	}
}
