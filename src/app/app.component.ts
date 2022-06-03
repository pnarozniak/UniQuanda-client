import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private titleService: Title
	) {
		this.router.events
			.pipe(
				filter((event) => event instanceof NavigationEnd),
				map(() => {
					let child = this.activatedRoute.firstChild;
					while (child) {
						if (child.firstChild) {
							child = child.firstChild;
						} else if (child.snapshot.data && child.snapshot.data['title']) {
							return child.snapshot.data['title'];
						} else {
							return null;
						}
					}
					return null;
				})
			)
			.subscribe((data: string | null) => {
				if (data) {
					this.titleService.setTitle(`UniQuanda - ${data}`);
				}
			});
	}
}
