import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-content-display',
	templateUrl: './content-display.component.html',
	styleUrls: ['./content-display.component.scss'],
})
export class ContentDisplayComponent {
	@Input() htmlContent!: string;
	// if false, show text only to first block
	@Input() showBlocks = true;
}
