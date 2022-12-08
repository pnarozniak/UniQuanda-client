import { Component, Input, OnInit } from '@angular/core';
import * as Editor from 'ckeditor5-custom-build/build/ckeditor';

@Component({
	selector: 'app-content-display',
	templateUrl: './content-display.component.html',
	styleUrls: ['./content-display.component.scss'],
})
export class ContentDisplayComponent implements OnInit {
	@Input() htmlContent = '';
	// if false, show text only to first block
	@Input() showBlocks = true;

	public editor = Editor;

	ngOnInit(): void {
		if (!this.showBlocks) {
			const parser = new DOMParser();
			const doc = parser.parseFromString(this.htmlContent, 'text/html');
			const selectorsToRemove = [
				'blockquote',
				'ul',
				'ol',
				'figure',
				'pre',
				'.math-tex',
			];
			selectorsToRemove.forEach((selector) => {
				const elements = doc.querySelectorAll(selector);
				elements.forEach((element) => {
					element.remove();
				});
			});
			// get first childs as string
			const firstChildText = doc.body.firstChild?.textContent;
			// get second child as string
			const secondChildText = doc.body.firstChild?.nextSibling?.textContent;
			if (
				(!firstChildText || firstChildText === '' || firstChildText === ' ') &&
				(!secondChildText || secondChildText === '' || secondChildText === ' ')
			)
				this.htmlContent =
					'Wejdź w szczegóły pytania aby zapoznać się z treścią';
			else if (
				!secondChildText ||
				secondChildText === '' ||
				secondChildText === ' '
			)
				this.htmlContent = `${firstChildText}...`;
			else this.htmlContent = `${firstChildText}<br/>${secondChildText}...`;
		}
	}
}
