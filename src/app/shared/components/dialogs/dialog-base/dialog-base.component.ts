import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { filter, Subscription, take } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
	selector: 'app-dialog-base',
	templateUrl: './dialog-base.component.html',
	styleUrls: ['./dialog-base.component.scss'],
})
export class DialogBaseComponent implements OnInit, OnDestroy {
	@Input() width = '600px';
	@Input() height?: string;
	@Input() title?: string;
	@Input() showBackButton = false;
	@Output() backButtonClicked = new EventEmitter();

	subscription = new Subscription();

	constructor(
		private readonly _dialogRef: MatDialogRef<unknown>,
		private readonly _themeService: ThemeService
	) {}

	ngOnInit(): void {
		this.subscription.add(this.subscribeToTheme());
		this._dialogRef.addPanelClass('dialog-base-panel');
		this._dialogRef.updateSize(this.width, this.height);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	private subscribeToTheme = () =>
		this._themeService
			.isDark$()
			.pipe(
				take(1),
				filter((isDark) => isDark)
			)
			.subscribe(() => {
				this._dialogRef.addPanelClass('dark');
			});
}
