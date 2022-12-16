import { AfterViewInit, Component } from '@angular/core';

@Component({
	selector: 'app-content-ad',
	templateUrl: './content-ad.component.html',
	styleUrls: ['./content-ad.component.scss'],
})
export class ContentAdComponent implements AfterViewInit {
	ngAfterViewInit(): void {
		setTimeout(() => {
			try {
				(window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
			} catch (e) {
				console.error(e);
			}
		});
	}
}
