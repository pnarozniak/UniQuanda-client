import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
	templateUrl: './scroll-to-element-feature.component.html',
})
export abstract class ScrollToElementFeatureComponent {
	@ViewChild('componentRef', { read: ElementRef }) componentRef?: ElementRef;

	protected scrollToEl() {
		setTimeout(() => {
			this.componentRef?.nativeElement?.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		}, 0);
	}
}
