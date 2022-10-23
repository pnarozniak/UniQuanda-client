import { Component } from '@angular/core';

@Component({
	selector: 'app-recover-password',
	templateUrl: './recover-password.component.html',
	styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent {
	activeView: 'form' | 'success' = 'form';
}
