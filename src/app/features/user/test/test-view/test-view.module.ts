import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { TestViewRoutingModule } from './test-view-routing.module';
import { TestViewComponent } from './test-view.component';
import { TestViewAnswerComponent } from './components/test-view-answer/test-view-answer.component';
import { TestViewQuestionComponent } from './components/test-view-question/test-view-question.component';
import { TestViewNavComponent } from './components/test-view-nav/test-view-nav.component';
import { TestFinishConfirmationDialogComponent } from './components/test-finish-confirmation-dialog/test-finish-confirmation-dialog.component';

@NgModule({
	declarations: [
		TestViewComponent,
		TestViewAnswerComponent,
		TestViewQuestionComponent,
		TestViewNavComponent,
		TestFinishConfirmationDialogComponent,
	],
	imports: [CommonModule, TestViewRoutingModule, SharedModule],
})
export class TestViewModule {}
