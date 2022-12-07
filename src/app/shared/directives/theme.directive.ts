import { Directive, HostBinding } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';

@Directive({
	selector: '[appTheme]',
})
export class ThemeDirective {
	@HostBinding('class')
	public elementClass: Theme = Theme.LIGHT;

	constructor(private readonly _themeService: ThemeService) {
		this.listenForThemeChange();
	}

	listenForThemeChange(): void {
		this._themeService.isDark$().subscribe((isDark) => {
			this.elementClass = isDark ? Theme.DARK : Theme.LIGHT;
			window.document.body.classList.toggle(Theme.DARK, isDark); // This line is needed for ckeditor to work properly
		});
	}
}

enum Theme {
	LIGHT = 'light',
	DARK = 'dark',
}
