import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { UniversityComponent } from './university.component';
import { UniversityRoutingModule } from './university.routing.module';
import { UniversityHeaderComponent } from './components/university-header/university-header.component';
import { UniversityQuestionBoxComponent } from './components/university-question-box/university-question-box.component';

@NgModule({
	imports: [CommonModule, SharedModule, UniversityRoutingModule],
	declarations: [
		UniversityComponent,
		UniversityHeaderComponent,
		UniversityQuestionBoxComponent,
	],
})
export class UniversityModule {}
