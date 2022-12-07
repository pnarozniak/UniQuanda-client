import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AskQuestionRoutingModule } from './ask-question.routing.module';
import { AskQuestionComponent } from './ask-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionChipsComponent } from './components/question-chips/question-chips.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
	imports: [
		CommonModule,
		AskQuestionRoutingModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		MatChipsModule,
		MatAutocompleteModule,
		MatFormFieldModule,
	],
	declarations: [AskQuestionComponent, QuestionChipsComponent],
})
export class AskQuestionModule {}
