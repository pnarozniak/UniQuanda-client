import { Component, HostBinding } from '@angular/core';

@Component({
	selector: 'app-uniquanda-line',
	templateUrl: './uniquanda-line.component.html',
	styleUrls: ['./uniquanda-line.component.scss'],
})
export class UniquandaLineComponent {
	@HostBinding('class') classes = 'app-uniquanda-line';
}
