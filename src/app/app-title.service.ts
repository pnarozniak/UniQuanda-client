import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Injectable()
export class AppTitleService {
	constructor(
		private readonly _router: Router,
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _titleService: Title
	) {}

	public manageTitleChange() {
		this._router.events
			.pipe(
				filter((event) => event instanceof NavigationEnd),
				map(() => {
					let child = this._activatedRoute.firstChild;
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
					this._titleService.setTitle(`UniQuanda - ${data}`);
				}
			});
	}
}
