import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { AutomaticTestRoutingModule } from './automatic-test-routing.module';
import { AutomaticTestComponent } from './automatic-test.component';
import { AutomaticTestNavComponent } from './components/automatic-test-nav/automatic-test-nav.component';
import { AutomaticTestQuestionComponent } from './components/automatic-test-question/automatic-test-question.component';
import { AutomaticTestAnswerComponent } from './components/automatic-test-answer/automatic-test-answer.component';

@NgModule({
	declarations: [
		AutomaticTestComponent,
		AutomaticTestNavComponent,
		AutomaticTestQuestionComponent,
  AutomaticTestAnswerComponent,
	],
	imports: [CommonModule, AutomaticTestRoutingModule, SharedModule],
})
export class AutomaticTestModule {}
