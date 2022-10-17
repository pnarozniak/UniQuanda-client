import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[appContext]',
})
export class ContextDirective<T> {
	private contextValue!: T;
	constructor(
		private templateRef: TemplateRef<any>,
		private viewContainerRef: ViewContainerRef
	) {}

	@Input() set appContextOf(value: T) {
		this.contextValue = value;
		this.renderWithContext();
	}

	private renderWithContext(): void {
		this.viewContainerRef.clear();
		this.viewContainerRef.createEmbeddedView(this.templateRef, {
			$implicit: this.contextValue,
		});
	}
}
