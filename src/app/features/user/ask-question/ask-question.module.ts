import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AskQuestionRoutingModule } from './ask-question.routing.module';
import { AskQuestionComponent } from './ask-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LimitExceededComponent } from './pages/limit-exceeded/limit-exceeded.component';

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
	declarations: [AskQuestionComponent, LimitExceededComponent],
})
export class AskQuestionModule {}
