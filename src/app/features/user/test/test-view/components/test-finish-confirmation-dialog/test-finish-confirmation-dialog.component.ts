import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';
import { TestViewApiService } from '../../services/test-view-api.service';

@Component({
	selector: 'app-test-finish-confirmation-dialog',
	templateUrl: './test-finish-confirmation-dialog.component.html',
	styleUrls: ['./test-finish-confirmation-dialog.component.scss'],
})
export class TestFinishConfirmationDialogComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA) private data: { idTest: number },
		private dialogRef: MatDialogRef<TestFinishConfirmationDialogComponent>,
		private testViewApi: TestViewApiService,
		private router: Router,
		private toastr: ToastrService,
		private loader: LoaderService
	) {}

	finishTest() {
		this.loader.show();
		this.testViewApi
			.markTestAsFinished$(this.data.idTest)
			.pipe(
				finalize(() => {
					this.dialogRef.close();
					this.loader.hide();
				})
			)
			.subscribe({
				next: () => {
					this.router.navigate(['/user/test']);
					this.toastr.success(
						'Gratulacje!',
						'Test został oznaczony jako rozwiązany'
					);
				},
				error: () => {
					this.toastr.error(
						'Test nie mógł zostać oznaczony jako zakończony. Spróbuj ponownie.',
						'Przepraszamy, wystąpił bład'
					);
				},
			});
	}

	cancel() {
		this.dialogRef.close();
	}
}
