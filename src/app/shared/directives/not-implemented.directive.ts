import { Directive, HostBinding, HostListener, Optional } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink, RouterLinkWithHref } from '@angular/router';

@Directive({
	selector: '[appNotImplemented]',
	providers: [MatTooltip],
})
export class NotImplementedDirective {
	@HostBinding() class = 'not-implemented';

	constructor(
		private tooltip: MatTooltip,
		@Optional() private routerLink: RouterLink,
		@Optional() private routerLinkWithHref: RouterLinkWithHref
	) {
		this.disableRouterLink();
	}

	@HostListener('mouseover') mouseover() {
		this.tooltip.message = 'Dostępne w wersji 2.0';
		this.tooltip.show();
	}

	@HostListener('mouseleave') mouseleave() {
		this.tooltip.hide();
	}

	@HostListener('click', ['$event']) click(event: Event) {
		event.preventDefault();
		event.stopImmediatePropagation();
	}

	disableRouterLink() {
		const link = this.routerLink || this.routerLinkWithHref;
		if (!link) return;
		link.onClick = () => false;
	}
}
